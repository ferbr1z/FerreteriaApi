import { IsArray, IsNotEmpty,  IsNumberString } from 'class-validator';
export class CreateDetallePedidoDto {
  
  @IsNotEmpty()
  @IsArray()
  producto: object;
}
