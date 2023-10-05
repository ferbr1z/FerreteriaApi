import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import { Producto } from './entity/producto.entity';
import { ProductosController } from 'src/controllers/productos/productos.controller';
import { ProductosService } from 'src/services/productos/productos.service';
import { Categoria } from '../categorias/entity/categoria.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { Usuario } from '../usuarios/entity/usuario.entity';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';

@Module({
    imports:[TypeOrmModule.forFeature([Producto, Categoria, Usuario])],
    controllers:[ProductosController],
    providers:[ProductosService, UsuariosService, AuthService],
    exports: [TypeOrmModule.forFeature([Producto, Categoria])]
})
export class ProductosModule {}