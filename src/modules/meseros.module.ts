import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeserosService } from 'src/services/meseros.service';
import { MeserosController } from 'src/controllers/meseros.controller';
import { Mesero } from 'src/entities/mesero.entity';
import { Mesa } from 'src/entities/mesa.entity'; // Importar la entidad Mesa

@Module({
  imports: [TypeOrmModule.forFeature([Mesero, Mesa])],
  controllers: [MeserosController],
  providers: [MeserosService],
})
export class MeserosModule {}