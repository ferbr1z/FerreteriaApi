import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './modules/productos/productos.module';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { Pedido } from './entities/pedido.entity';
import { PedidosDetallesModule } from './modules/pedidos-detalles/pedidos-detalles.module';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { Categoria } from './entities/categoria.entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { host, port, username, password, database, jwtKey } from './config';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    JwtModule.register({
      global: true,
      secret: jwtKey,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      entities: [Producto, Pedido, PedidoDetalle, Categoria, Usuario],
      synchronize: true,
    }),
    ProductosModule,
    PedidosModule,
    PedidosDetallesModule,
    CategoriasModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
