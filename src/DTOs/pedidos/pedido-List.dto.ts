import { ApiProperty } from "@nestjs/swagger";
import { PedidoDto } from "./pedido.dto";
import { IsNotEmpty } from "class-validator";
import { Pedido } from "src/modules/pedidos/entity/pedido.entity";

export class PedidoListDto {
    @ApiProperty()
    @IsNotEmpty()
    pedidos: Pedido[];

    @ApiProperty()
    @IsNotEmpty()
    totalItems: number;

    @ApiProperty()
    @IsNotEmpty()
    thereIsNextPage: boolean;
}