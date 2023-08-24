import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entity/pedido.entity';
import { PedidoDetalle } from '../pedidos-detalles/entity/pedido-detalle.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Pedido, PedidoDetalle])],
    exports:[TypeOrmModule.forFeature([Pedido, PedidoDetalle])]
})
export class PedidosModule {}
