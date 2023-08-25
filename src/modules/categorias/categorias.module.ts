import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entity/categoria.entity';
import { CategoriasController } from 'src/controllers/categorias/categorias.controller';
import { CategoriasService } from 'src/services/categorias/categorias.service';

@Module({
    imports:[TypeOrmModule.forFeature([Categoria])],
    controllers:[CategoriasController],
    providers:[CategoriasService],
    exports:[TypeOrmModule.forFeature([Categoria])]
})
export class CategoriasModule {}