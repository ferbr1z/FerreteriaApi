import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import { Producto } from './entity/producto.entity';
import { ProductosController } from 'src/controllers/productos/productos.controller';
import { ProductosService } from 'src/services/productos/productos.service';
@Module({
    imports:[TypeOrmModule.forFeature([Producto])],
    controllers:[ProductosController],
    providers:[ProductosService],
    exports: [TypeOrmModule.forFeature([Producto])]
})
export class ProductosModule {}
