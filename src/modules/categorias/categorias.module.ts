import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../../entities/categoria.entity';
import { CategoriasController } from 'src/controllers/categorias/categorias.controller';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { Producto } from '../../entities/producto.entity';
import { Usuario } from '../../entities/usuario.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Producto, Usuario])],
  controllers: [CategoriasController],
  providers: [CategoriasService, AuthService, UsuariosService],
  exports: [TypeOrmModule.forFeature([Categoria, Producto])],
})
export class CategoriasModule {}
