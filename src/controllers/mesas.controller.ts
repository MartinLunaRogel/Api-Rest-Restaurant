import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { MesasService } from 'src/services/mesas.service';
import { CreateMesaDto } from 'src/dtos/create-mesa.dto';
import { UpdateMesaDto } from 'src/dtos/update-mesa.dto';
import { ApiTags } from '@nestjs/swagger';
import { Mesa } from 'src/entities/mesa.entity';

@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  async findAll(
    @Query('filterField') filterField: string, 
    @Query('filterValue') filterValue: string,   
    @Query('page') page: number = 1,            
    @Query('limit') limit: number = 10          
  ) {
    return this.mesasService.findAll(filterField, filterValue, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(+id);
  }

  @Put(':id')
  async updateMesa(@Param('id') id: number, @Body() updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    return this.mesasService.updateMesa(id, updateMesaDto);
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
