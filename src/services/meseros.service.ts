import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeseroDto } from 'src/dtos/create-mesero.dto';
import { UpdateMeseroDto } from 'src/dtos/update-mesero.dto';
import { Mesero } from 'src/entities/mesero.entity';
import { Mesa } from 'src/entities/mesa.entity';

@Injectable()
export class MeserosService {
  constructor(
    @InjectRepository(Mesero)
    private meserosRepository: Repository<Mesero>,
    @InjectRepository(Mesa)
    private mesasRepository: Repository<Mesa>,
  ) {}

  async create(createMeseroDto: CreateMeseroDto): Promise<Mesero> {
    const mesas = [];

    for (const idMesa of createMeseroDto.idMesas) {
      const mesa = await this.mesasRepository.findOne({ where: { idMesa } });

      if (!mesa) {
        throw new NotFoundException(`La mesa con ID ${idMesa} no existe`);
      }
      mesas.push(mesa);
    }

    const mesero = this.meserosRepository.create({
      ...createMeseroDto,
      mesas, 
    });

    return await this.meserosRepository.save(mesero);
  }

  async findAll(filterField: string, filterValue: string, page: number, limit: number) {
    const [items, total] = await this.meserosRepository.findAndCount({
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
  

  async findOne(id: string) {
    const mesero = await this.meserosRepository.findOne({ where: { idMesero: id }, relations: ['mesas'] }); 
    if (!mesero) {
      throw new NotFoundException('Mesero no encontrado');
    }
    return mesero;
  }

  async updateMesero(id: string, updateMeseroDto: UpdateMeseroDto): Promise<Mesero> {
    const mesero = await this.meserosRepository.findOne({where: {idMesero: id}});
    if (!mesero) {
      throw new NotFoundException(`Mesero con ID ${id} no encontrado`);
    }

    Object.assign(mesero, updateMeseroDto);
    return this.meserosRepository.save(mesero);
  }

  async update(id: string, updateMeseroDto: UpdateMeseroDto): Promise<Mesero> {
    const meseroExistente = await this.meserosRepository.findOne({ where: { idMesero: id }, relations: ['mesas'] });
    
    if (!meseroExistente) {
      throw new NotFoundException('Mesero no encontrado');
    }
  
    if (updateMeseroDto.idMesas) {
      for (const idMesa of updateMeseroDto.idMesas) {
        const mesa = await this.mesasRepository.findOne({ where: { idMesa } });
        if (!mesa) {
          throw new NotFoundException(`La mesa con ID ${idMesa} no existe`);
        }
        if (!meseroExistente.mesas.some(existingMesa => existingMesa.idMesa === mesa.idMesa)) {
          meseroExistente.mesas.push(mesa); 
        }
      }
    }
  
    return this.meserosRepository.save(meseroExistente);
  }
  
  
  

  async remove(id: string) {
    const mesero = await this.findOne(id);
    await this.mesasRepository.update({idMesero: mesero}, {idMesero: null});
    return this.meserosRepository.remove(mesero);
  }
}
