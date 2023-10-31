import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Producto } from 'src/entities/producto.entity';
export class ProductoListDto {
  @ApiProperty()
  @IsNotEmpty()
  productos: Producto[];

  @ApiProperty()
  @IsNotEmpty()
  totalItems: number;

  @ApiProperty()
  @IsNotEmpty()
  thereIsNextPage: boolean;
}
