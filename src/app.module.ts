import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './modules/productos/productos.module';
import { ProductosController } from './controllers/productos/productos.controller';
import { ProductosService } from './services/productos/productos.service';
import { Producto } from './modules/productos/entity/producto.entity';
import {TypeOrmModule} from "@nestjs/typeorm"
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { Pedido } from './modules/pedidos/entity/pedido.entity';
import { PedidosDetallesModule } from './modules/pedidos-detalles/pedidos-detalles.module';
import { PedidoDetalle } from './modules/pedidos-detalles/entity/pedido-detalle.entity';
import { PedidosService } from './services/pedidos/pedidos.service';
import { PedidosController } from './controllers/pedidos/pedidos.controller';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'ferreteria',
    entities: [Producto, Pedido, PedidoDetalle],
    synchronize: true,
  }), ProductosModule, PedidosModule, PedidosDetallesModule],
  controllers: [AppController, ProductosController, PedidosController],
  providers: [AppService, ProductosService, PedidosService],
})
export class AppModule { }
