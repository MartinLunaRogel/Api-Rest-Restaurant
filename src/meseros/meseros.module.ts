import { Module } from '@nestjs/common';
import { MeserosService } from './meseros.service';
import { MeserosController } from './meseros.controller';

@Module({
  controllers: [MeserosController],
  providers: [MeserosService],
})
export class MeserosModule {}
