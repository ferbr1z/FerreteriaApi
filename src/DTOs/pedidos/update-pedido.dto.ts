import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { EstadoPedido } from "src/constants/pedido-estados";

export class UpdatePedidoDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(EstadoPedido, {
        message: 'El valor de "estado" debe estar dentro del enum EstadoPedido',
    })
    estado: EstadoPedido;

}