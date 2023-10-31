import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoria } from 'src/DTOs/categorias/create-categoria.dto';
import { Categoria } from 'src/entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(createCategoria: CreateCategoria): Promise<Categoria> {
    const newCategoria = await this.categoriaRepo.create(createCategoria);
    return await this.categoriaRepo.save(newCategoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepo.find();
  }

  async findOne(id: number): Promise<Categoria> {
    return await this.categoriaRepo.findOne({ where: { id } });
  }

  async update(id: number, updateCategoria): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });
    Object.assign(categoria, updateCategoria);
    return await this.categoriaRepo.save(categoria);
  }

  async delete(id: number) {
    return (await this.categoriaRepo.delete({ id })).affected;
  }
}
