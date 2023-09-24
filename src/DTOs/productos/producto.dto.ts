import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Producto } from 'src/modules/productos/entity/producto.entity';
export class ProductoDto {
  @ApiProperty()
  @IsNotEmpty()
  productos: Producto[];

  @ApiProperty()
  @IsNotEmpty()
  totalItems : number;

  @ApiProperty()
  @IsNotEmpty()
  thereIsNextPage:boolean;

}
