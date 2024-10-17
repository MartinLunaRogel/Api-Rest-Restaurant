import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlimentoDto } from 'src/dtos/create-alimento.dto';
import { UpdateAlimentoDto } from 'src/dtos/update-alimento.dto';
import { Alimento } from 'src/entities/alimento.entity';

@Injectable()
export class AlimentosService {
    constructor(
        @InjectRepository(Alimento)
        private alimentoRepository: Repository<Alimento>,
    ) {}

    create(createAlimentoDto: CreateAlimentoDto) {
        const alimento = this.alimentoRepository.create(createAlimentoDto);
        return this.alimentoRepository.save(alimento);
    }

    async findAll(filterField: string, filterValue: string, page: number, limit: number) {
        const [items, total] = await this.alimentoRepository.findAndCount({
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

    findOne(id: number) {
        const alimento = this.alimentoRepository.findOneBy({ idProducto: id });
        if (!alimento) throw new NotFoundException("Alimento no encontrado");
        return alimento;
    }

    async update(id: number, updateAlimentoDto: UpdateAlimentoDto) {
        const alimentoToUpdate = await this.alimentoRepository.preload({
            idProducto: id,
            ...updateAlimentoDto,
        });
        if (!alimentoToUpdate) throw new NotFoundException("Alimento no encontrado");
        return this.alimentoRepository.save(alimentoToUpdate);
    }

    remove(id: number) {
        return this.alimentoRepository.delete({ idProducto: id });
    }
}
