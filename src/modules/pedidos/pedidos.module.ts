import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../../entities/pedido.entity';
import { PedidoDetalle } from '../../entities/pedido-detalle.entity';
import { PedidosController } from 'src/controllers/pedidos/pedidos.controller';
import { PedidosService } from 'src/services/pedidos/pedidos.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';
import { Usuario } from '../../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoDetalle, Usuario])],
  controllers: [PedidosController],
  providers: [PedidosService, AuthService, UsuariosService],
  exports: [TypeOrmModule.forFeature([Pedido, PedidoDetalle])],
})
export class PedidosModule {}
