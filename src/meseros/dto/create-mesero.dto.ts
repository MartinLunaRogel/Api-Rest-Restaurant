import { IsString, IsArray } from 'class-validator';

export class CreateMeseroDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsArray()
  idMesas: number[]; // Array de ID de mesas que el mesero atiende
}
