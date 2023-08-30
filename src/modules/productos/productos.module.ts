import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import { Producto } from './entity/producto.entity';
import { ProductosController } from 'src/controllers/productos/productos.controller';
import { ProductosService } from 'src/services/productos/productos.service';
import { Categoria } from '../categorias/entity/categoria.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Producto, Categoria])],
    controllers:[ProductosController],
    providers:[ProductosService],
    exports: [TypeOrmModule.forFeature([Producto, Categoria])]
})
export class ProductosModule {}