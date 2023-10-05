import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { CreateDetallePedidoDto } from './create-detalle-pedido.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePedidoDto {

    @ApiProperty()
    @IsNotEmpty()
    detalles: CreateDetallePedidoDto[]

    @ApiProperty()
    @IsNotEmpty()
    autorId: number;

}
