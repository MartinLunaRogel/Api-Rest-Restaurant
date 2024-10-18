import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors } from '@nestjs/common';
import { AlimentosService } from 'src/services/alimentos.service';
import { CreateAlimentoDto } from 'src/dtos/create-alimento.dto';
import { UpdateAlimentoDto } from 'src/dtos/update-alimento.dto';
import { ApiTags } from '@nestjs/swagger';
import { filter } from 'rxjs';
import { Alimento } from 'src/entities/alimento.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Alimentos y Bebidas')
@Controller('alimentos')
export class AlimentosController {
    constructor(private readonly alimentosService: AlimentosService) {}

    @Post()
    create(@Body() createAlimentoDto: CreateAlimentoDto) {
        return this.alimentosService.create(createAlimentoDto);
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async findAll(
        @Query('filterField') filterField: string,
        @Query('filterValue') filterValue: string,
        @Query('page') page: number = 1,
        @Query("limit") limit: number = 10
    ){
        return this.alimentosService.findAll(filterField, filterValue, page, limit);
    }

    @Get(':id')
    @UseInterceptors(CacheInterceptor)
    findOne(@Param('id') id: string) {
        return this.alimentosService.findOne(+id);
    }

    @Put(':id')
    async updateAlimento(@Param('id') id: number, @Body() updateAlimentoDto: UpdateAlimentoDto): Promise<Alimento> {
        return this.alimentosService.updateAlimento(id, updateAlimentoDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlimentoDto: UpdateAlimentoDto) {
        return this.alimentosService.update(+id, updateAlimentoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.alimentosService.remove(+id);
    }
}
