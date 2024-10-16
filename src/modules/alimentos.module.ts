import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimento } from 'src/entities/alimento.entity';
import { AlimentosService } from 'src/services/alimentos.service';
import { AlimentosController } from 'src/controllers/alimentos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Alimento])],
    controllers: [AlimentosController],
    providers: [AlimentosService],
})
export class AlimentosModule {}
