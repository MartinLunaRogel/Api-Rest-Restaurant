import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors } from '@nestjs/common';
import { MeserosService } from 'src/services/meseros.service';
import { CreateMeseroDto } from 'src/dtos/create-mesero.dto';
import { UpdateMeseroDto } from 'src/dtos/update-mesero.dto';
import { ApiTags } from '@nestjs/swagger';
import { Mesero } from 'src/entities/mesero.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Meseros')
@Controller('meseros')
export class MeserosController {
  constructor(private readonly meserosService: MeserosService) {}

  @Post()
  create(@Body() createMeseroDto: CreateMeseroDto) {
    return this.meserosService.create(createMeseroDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll(
    @Query('filterField') filterField: string, 
    @Query('filterValue') filterValue: string,   
    @Query('page') page: number = 1,             
    @Query('limit') limit: number = 10           
  ) {
    return this.meserosService.findAll(filterField, filterValue, page, limit);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.meserosService.findOne(id);
  }

  @Put(':id')
  async updateMesero(@Param('id') id: string, @Body() updateMeseroDto: UpdateMeseroDto): Promise<Mesero> {
    return this.meserosService.updateMesero(id, updateMeseroDto);
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
