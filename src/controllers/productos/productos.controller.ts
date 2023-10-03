import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProductosService } from 'src/services/productos/productos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductoDto } from 'src/DTOs/productos/create-producto.dto';
import { UpdateProductoDto } from 'src/DTOs/productos/update-producto.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@UseGuards(RolesGuard)
@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) { }

    @Roles('ADMIN')
    @Post()
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './public/uploads',
                filename: (req, file, calback) => {
                    calback(null, Date.now() + file.originalname);
                },
            }),
        }),
    )
    async create(
        @Body(new ValidationPipe()) createProductoDto: CreateProductoDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000000 }),
                    new FileTypeValidator({ fileType: 'image/jpeg' }),
                ],
            }),
        )
        img: Express.Multer.File,
    ) {
        const nuevoProducto = await this.productosService.create(
            createProductoDto,
            img,
        );
        return { nuevoProducto };
    }

    @Roles('VENDEDOR')
    @Get()
    @ApiQuery({
        name: "pag",
        type: Number,
        description: "numbero de paginacion",
        required: false
    })
    async findAll(@Query('pag',) pag?: number) {
        return await this.productosService.findAll(pag);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productosService.findOne(+id);
    }

    @Roles('ADMIN')
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductoDto: UpdateProductoDto,
    ) {
        return this.productosService.update(+id, updateProductoDto);
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productosService.remove(+id);
    }
}