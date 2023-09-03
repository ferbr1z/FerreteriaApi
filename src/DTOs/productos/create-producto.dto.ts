import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  precio: number;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumberString()
  // categoria: number;

}
