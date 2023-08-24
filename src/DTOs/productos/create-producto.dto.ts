import { ParseIntPipe } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class CreateProductoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsNumberString()
  precio: number;
}
