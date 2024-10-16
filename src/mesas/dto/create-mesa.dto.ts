import { IsString, IsNumber } from 'class-validator';

export class CreateMesaDto {
  @IsNumber()
  idMesa: number;

  @IsString()
  tamanoMesa: string;

  @IsNumber()
  totalCuenta: number;

  idProducto: number[]; // Array de idProducto
}
