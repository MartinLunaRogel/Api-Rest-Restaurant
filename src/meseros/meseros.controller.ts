import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeserosService } from './meseros.service';
import { CreateMeseroDto } from './dto/create-mesero.dto';
import { UpdateMeseroDto } from './dto/update-mesero.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meseros')
@Controller('meseros')
export class MeserosController {
  constructor(private readonly meserosService: MeserosService) {}

  @Post()
  create(@Body() createMeseroDto: CreateMeseroDto) {
    return this.meserosService.create(createMeseroDto);
  }

  @Get()
  findAll() {
    return this.meserosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meserosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeseroDto: UpdateMeseroDto) {
    return this.meserosService.update(id, updateMeseroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meserosService.remove(id);
  }
}
