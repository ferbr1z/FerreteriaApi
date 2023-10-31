import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductosService } from 'src/services/productos/productos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductoDto } from 'src/DTOs/productos/create-producto.dto';
import { UpdateProductoDto } from 'src/DTOs/productos/update-producto.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductoQueryDto } from 'src/DTOs/productos/producto-query.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @ApiOperation({ summary: 'Rol requerido: ADMIN' })
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
          new MaxFileSizeValidator({ maxSize: 10000000 }),
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

  @Roles('CLIENTE', 'VENDEDOR')
  @Get()
  async findAll(@Query() query: ProductoQueryDto) {
    return await this.productosService.findAll(query);
  }

  @Roles('CLIENTE', 'VENDEDOR')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Rol requerido: ADMIN' })
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @ApiOperation({ summary: 'Rol requerido: ADMIN' })
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
