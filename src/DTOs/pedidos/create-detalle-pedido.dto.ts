import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateDetallePedidoDto {
  @ApiProperty()
  @IsNotEmpty()
  producto: object;

  @ApiProperty()
  @IsNotEmpty()
  cantidad: number;
}
