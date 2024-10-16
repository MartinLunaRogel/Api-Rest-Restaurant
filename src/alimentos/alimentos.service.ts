import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';
import { Alimento } from './entities/alimento.entity';

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

    findAll() {
        return this.alimentoRepository.find();
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
