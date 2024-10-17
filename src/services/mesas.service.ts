import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMesaDto } from 'src/dtos/create-mesa.dto';
import { UpdateMesaDto } from 'src/dtos/update-mesa.dto';
import { Mesa } from 'src/entities/mesa.entity';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private mesasRepository: Repository<Mesa>,
  ) {}

  create(createMesaDto: CreateMesaDto) {
    return this.mesasRepository.save(createMesaDto);
  }

  async findAll(filterField: string, filterValue: string, page: number, limit: number) {
    const [items, total] = await this.mesasRepository.findAndCount({
      where: { [filterField]: filterValue },
      take: limit,
      skip: (page - 1) * limit,
    });
    
    return {
      data: items,
      total,
      page,
      limit,
    };
  }
  

  async findOne(id: number) {
    const mesa = await this.mesasRepository.findOneBy({ idMesa: id });
    if (!mesa) throw new NotFoundException("Mesa no encontrada");
    return mesa;
  }

  async updateMesa(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    const mesa = await this.mesasRepository.findOneBy({idMesa: id});
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    }

    Object.assign(mesa, updateMesaDto);
    return this.mesasRepository.save(mesa);
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesaToUpdate = await this.mesasRepository.preload({
      idMesa: id,
      ...updateMesaDto,
    });
    if (!mesaToUpdate) throw new NotFoundException("Mesa no encontrada");
    return this.mesasRepository.save(mesaToUpdate);
  }

  remove(id: number) {
    return this.mesasRepository.delete({ idMesa: id });
  }
}
