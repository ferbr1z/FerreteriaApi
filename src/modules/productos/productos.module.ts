import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import { Producto } from './entity/producto.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Producto])],
    exports: [TypeOrmModule.forFeature([Producto])]
})
export class ProductosModule {}
