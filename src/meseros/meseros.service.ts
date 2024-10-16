import { Injectable } from '@nestjs/common';
import { CreateMeseroDto } from './dto/create-mesero.dto';
import { UpdateMeseroDto } from './dto/update-mesero.dto';

@Injectable()
export class MeserosService {
  create(createMeseroDto: CreateMeseroDto) {
    return 'This action adds a new mesero';
  }

  findAll() {
    return `This action returns all meseros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mesero`;
  }

  update(id: number, updateMeseroDto: UpdateMeseroDto) {
    return `This action updates a #${id} mesero`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesero`;
  }
}
