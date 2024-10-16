import { PartialType } from '@nestjs/swagger';
import { CreateMeseroDto } from './create-mesero.dto';

export class UpdateMeseroDto extends PartialType(CreateMeseroDto) {}
