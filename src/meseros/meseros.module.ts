import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeserosService } from './meseros.service';
import { MeserosController } from './meseros.controller';
import { Mesero } from './entities/mesero.entity';
import { Mesa } from '../mesas/entities/mesa.entity'; // Importar la entidad Mesa

@Module({
  imports: [TypeOrmModule.forFeature([Mesero, Mesa])],
  controllers: [MeserosController],
  providers: [MeserosService],
})
export class MeserosModule {}
