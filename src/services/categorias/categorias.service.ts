import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoria } from 'src/DTOs/categorias/create-categoria.dto';
import { Categoria } from 'src/modules/categorias/entity/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    constructor(@InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>) { }

    async create(createCategoria: CreateCategoria): Promise<Categoria> {
        const newCategoria = await this.categoriaRepo.create(createCategoria);
        return await this.categoriaRepo.save(newCategoria);
    }

    async findAll() {
        return await this.categoriaRepo.find();
    }


}
