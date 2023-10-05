import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CategoriaProductoDto } from '../categorias/categoria-producto.dto';
export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  precio: number;

  @ApiProperty()
  @IsNotEmpty()
  categoria: CategoriaProductoDto;

}
