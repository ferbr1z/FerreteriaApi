import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProductosService } from 'src/services/productos/productos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductoDto } from 'src/DTOs/productos/create-producto.dto';
import { UpdateProductoDto } from 'src/DTOs/productos/update-producto.dto';

@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) { }

    @Post()
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './uploads',
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

    @Get()
    async findAll() {
        return await this.productosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productosService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductoDto: UpdateProductoDto,
    ) {
        return this.productosService.update(+id, updateProductoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productosService.remove(+id);
    }
}

