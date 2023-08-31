import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Delete, ValidationPipe } from '@nestjs/common';
import { CreateCategoria } from 'src/DTOs/categorias/create-categoria.dto';
import { Categoria } from 'src/modules/categorias/entity/categoria.entity';
import { CategoriasService } from 'src/services/categorias/categorias.service';

@Controller('categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService) { }

    @Post()
    @HttpCode(200)
    create(@Body(new ValidationPipe()) createCategoria: CreateCategoria): Promise<Categoria> {
        return this.categoriaService.create(createCategoria);
    }

    @Get()
    async findAll() {
        const categorias: Categoria[] = await this.categoriaService.findAll();
        if (categorias.length === 0) {
            return new NotFoundException("No se han creado categorías aún");
        }
        return categorias;
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoriaService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoria: CreateCategoria) {
        return this.categoriaService.update(+id, updateCategoria);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.categoriaService.delete(+id);
    }

}
