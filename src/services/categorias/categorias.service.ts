import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/modules/categorias/entity/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    constructor(@InjectRepository(Categoria) categoriaRepo: Repository<Categoria>){}

    async create(createCategoria ){
        
    }

}
