import { IsArray, IsNotEmpty,  IsNumberString } from 'class-validator';
export class CreateDetallePedidoDto {
  
  @IsNotEmpty()
  producto: object;

  @IsNotEmpty()
  cantidad:number;

}
