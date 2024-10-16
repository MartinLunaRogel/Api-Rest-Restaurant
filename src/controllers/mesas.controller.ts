import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesasService } from 'src/services/mesas.service';
import { CreateMesaDto } from 'src/dtos/create-mesa.dto';
import { UpdateMesaDto } from 'src/dtos/update-mesa.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  findAll() {
    return this.mesasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesasService.update(+id, updateMesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesasService.remove(+id);
  }
}
