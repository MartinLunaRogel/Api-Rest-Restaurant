import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private mesasRepository: Repository<Mesa>,
  ) {}

  create(createMesaDto: CreateMesaDto) {
    return this.mesasRepository.save(createMesaDto);
  }

  findAll() {
    return this.mesasRepository.find();
  }

  async findOne(id: number) {
    const mesa = await this.mesasRepository.findOneBy({ idMesa: id });
    if (!mesa) throw new NotFoundException("Mesa no encontrada");
    return mesa;
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
