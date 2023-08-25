import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entity/pedido.entity';
import { PedidoDetalle } from '../pedidos-detalles/entity/pedido-detalle.entity';
import { PedidosController } from 'src/controllers/pedidos/pedidos.controller';
import { PedidosService } from 'src/services/pedidos/pedidos.service';

@Module({
    imports:[TypeOrmModule.forFeature([Pedido, PedidoDetalle])],
    controllers:[PedidosController],
    providers:[PedidosService],
    exports:[TypeOrmModule.forFeature([Pedido, PedidoDetalle])]
})
export class PedidosModule {}
