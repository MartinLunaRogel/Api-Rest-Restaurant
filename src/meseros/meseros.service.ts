import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeseroDto } from './dto/create-mesero.dto';
import { UpdateMeseroDto } from './dto/update-mesero.dto';
import { Mesero } from './entities/mesero.entity';
import { Mesa } from '../mesas/entities/mesa.entity';

@Injectable()
export class MeserosService {
  constructor(
    @InjectRepository(Mesero)
    private meserosRepository: Repository<Mesero>,
    @InjectRepository(Mesa)
    private mesasRepository: Repository<Mesa>,
  ) {}

  async create(createMeseroDto: CreateMeseroDto) {
    const { idMesas, ...restoMesero } = createMeseroDto;

    // Validar que las mesas existan
    const mesas = await this.mesasRepository.findByIds(idMesas);
    if (mesas.length !== idMesas.length) {
      throw new NotFoundException('Una o más mesas no existen');
    }

    const nuevoMesero = this.meserosRepository.create({ ...restoMesero, idMesas });
    return this.meserosRepository.save(nuevoMesero);
  }

  findAll() {
    return this.meserosRepository.find({ relations: ['idMesas'] });
  }

  async findOne(id: string) {
    const mesero = await this.meserosRepository.findOne({ where: { idMesero: id }, relations: ['idMesas'] });
    if (!mesero) {
      throw new NotFoundException('Mesero no encontrado');
    }
    return mesero;
  }

  async update(id: string, updateMeseroDto: UpdateMeseroDto) {
    const meseroExistente = await this.meserosRepository.preload({
      idMesero: id,
      ...updateMeseroDto,
    });

    if (!meseroExistente) {
      throw new NotFoundException('Mesero no encontrado');
    }

    return this.meserosRepository.save(meseroExistente);
  }

  async remove(id: string) {
    const mesero = await this.findOne(id);
    return this.meserosRepository.remove(mesero);
  }
}
