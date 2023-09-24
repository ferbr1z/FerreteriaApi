import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './modules/productos/productos.module';
import { Producto } from './modules/productos/entity/producto.entity';
import { TypeOrmModule } from "@nestjs/typeorm"
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { Pedido } from './modules/pedidos/entity/pedido.entity';
import { PedidosDetallesModule } from './modules/pedidos-detalles/pedidos-detalles.module';
import { PedidoDetalle } from './modules/pedidos-detalles/entity/pedido-detalle.entity';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { Categoria } from './modules/categorias/entity/categoria.entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { host, port, username,password,database } from './config';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public'
        }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [Producto, Pedido, PedidoDetalle, Categoria],
    synchronize: true,
  }), ProductosModule,
    PedidosModule,
    PedidosDetallesModule,
    CategoriasModule,
    UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
