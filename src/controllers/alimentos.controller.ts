import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlimentosService } from 'src/services/alimentos.service';
import { CreateAlimentoDto } from 'src/dtos/create-alimento.dto';
import { UpdateAlimentoDto } from 'src/dtos/update-alimento.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alimentos y Bebidas')
@Controller('alimentos')
export class AlimentosController {
    constructor(private readonly alimentosService: AlimentosService) {}

    @Post()
    create(@Body() createAlimentoDto: CreateAlimentoDto) {
        return this.alimentosService.create(createAlimentoDto);
    }

    @Get()
    findAll() {
        return this.alimentosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.alimentosService.findOne(+id);
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
