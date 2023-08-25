import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './modules/productos/productos.module';
import { ProductosController } from './controllers/productos/productos.controller';
import { Producto } from './modules/productos/entity/producto.entity';
import { TypeOrmModule } from "@nestjs/typeorm"
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { Pedido } from './modules/pedidos/entity/pedido.entity';
import { PedidosDetallesModule } from './modules/pedidos-detalles/pedidos-detalles.module';
import { PedidoDetalle } from './modules/pedidos-detalles/entity/pedido-detalle.entity';
import { PedidosService } from './services/pedidos/pedidos.service';
import { PedidosController } from './controllers/pedidos/pedidos.controller';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { CategoriasController } from './controllers/categorias/categorias.controller';
import { CategoriasService } from './services/categorias/categorias.service';


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
  }), ProductosModule,
    PedidosModule,
    PedidosDetallesModule,
    CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
