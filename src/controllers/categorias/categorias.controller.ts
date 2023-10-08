import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCategoria } from 'src/DTOs/categorias/create-categoria.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Categoria } from 'src/modules/categorias/entity/categoria.entity';
import { CategoriasService } from 'src/services/categorias/categorias.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService) { }

    @ApiOperation({ summary: 'Rol requerido: ADMIN' })
    @Roles('ADMIN')
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

    @ApiOperation({ summary: 'Rol requerido: ADMIN' })
    @Roles('ADMIN')
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoria: CreateCategoria) {
        return this.categoriaService.update(+id, updateCategoria);
    }

    @ApiOperation({ summary: 'Rol requerido: ADMIN' })
    @Roles('ADMIN')
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.categoriaService.delete(+id);
    }

}
