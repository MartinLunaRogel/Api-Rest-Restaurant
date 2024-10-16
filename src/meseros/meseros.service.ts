import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'; 
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

  async create(createMeseroDto: CreateMeseroDto): Promise<Mesero> {
    const mesas = [];

    // Itera sobre los ID de mesas para verificar que existen
    for (const idMesa of createMeseroDto.idMesas) {
      const mesa = await this.mesasRepository.findOne({ where: { idMesa } });

      if (!mesa) {
        throw new NotFoundException(`La mesa con ID ${idMesa} no existe`);
      }
      mesas.push(mesa);
    }

    // Crea un nuevo mesero y asigna las mesas verificadas
    const mesero = this.meserosRepository.create({
      ...createMeseroDto,
      mesas, // Asigna el array de mesas
    });

    // Guarda el mesero en la base de datos
    return await this.meserosRepository.save(mesero);
  }

  findAll() {
    return this.meserosRepository.find({ relations: ['mesas'] }); // Cambiado de idMesas a mesas
  }

  async findOne(id: string) {
    const mesero = await this.meserosRepository.findOne({ where: { idMesero: id }, relations: ['mesas'] }); // Cambiado de idMesas a mesas
    if (!mesero) {
      throw new NotFoundException('Mesero no encontrado');
    }
    return mesero;
  }

  async update(id: string, updateMeseroDto: UpdateMeseroDto): Promise<Mesero> {
    const meseroExistente = await this.meserosRepository.findOne({ where: { idMesero: id }, relations: ['mesas'] });
    
    if (!meseroExistente) {
      throw new NotFoundException('Mesero no encontrado');
    }
  
    // Si se proporciona idMesas en la solicitud, agregarlas
    if (updateMeseroDto.idMesas) {
      for (const idMesa of updateMeseroDto.idMesas) {
        const mesa = await this.mesasRepository.findOne({ where: { idMesa } });
        if (!mesa) {
          throw new NotFoundException(`La mesa con ID ${idMesa} no existe`);
        }
        // Comprobar si la mesa ya está asociada antes de agregarla
        if (!meseroExistente.mesas.some(existingMesa => existingMesa.idMesa === mesa.idMesa)) {
          meseroExistente.mesas.push(mesa); // Agregar la instancia de mesa
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
