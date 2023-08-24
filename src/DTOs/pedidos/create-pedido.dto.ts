import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { CreateDetallePedidoDto } from './create-detalle-pedido.dto';
export class CreatePedidoDto {
  
    @IsNotEmpty()
    detalles: CreateDetallePedidoDto[]

}
