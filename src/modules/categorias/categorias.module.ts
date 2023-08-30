import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entity/categoria.entity';
import { CategoriasController } from 'src/controllers/categorias/categorias.controller';
import { CategoriasService } from 'src/services/categorias/categorias.service';
import { Producto } from '../productos/entity/producto.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Categoria, Producto])],
    controllers:[CategoriasController],
    providers:[CategoriasService],
    exports:[TypeOrmModule.forFeature([Categoria, Producto])]
})
export class CategoriasModule {}