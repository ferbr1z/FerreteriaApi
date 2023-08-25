import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
} from '@nestjs/common';
import { CreateProductoDto } from 'src/DTOs/productos/create-producto.dto';
import { UpdateProductoDto } from 'src/DTOs/productos/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/modules/productos/entity/producto.entity';
import * as fs from 'fs';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private productosRepo: Repository<Producto>,
    ) { }

    async create(
        createProductoDto: CreateProductoDto,
        img: Express.Multer.File,
    ): Promise<Producto | HttpException> {
        const newProducto = await this.productosRepo.create(createProductoDto);
        newProducto.img_url = `${img.destination}/${img.filename}`;
        return await this.productosRepo.save(newProducto);
    }

    async findAll() {
        const productos = await this.productosRepo.find();

        productos.map((producto) => {
            const imagePath = producto.img_url;
            const image = fs.readFileSync(imagePath);
            const imageB64 = image.toString('base64');
            producto.img_url = imageB64;
            return producto;
        });

        return productos;
    }

    async findOne(id: number) {
        try {
            const producto = await this.productosRepo.findOne({ where: { id } });
            if (!producto)
                return new HttpException(
                    { error: 'producto no encontrado' },
                    HttpStatus.NOT_FOUND,
                );

            return producto;
        } catch (error) {
            return new HttpException(
                { error: error.driverError.detail },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(
        id: number,
        updateProductoDto: UpdateProductoDto,
    ): Promise<Producto | HttpException> {
        try {
            const producto = await this.productosRepo.findOneBy({ id });
            Object.assign(producto, updateProductoDto);
            this.productosRepo.save(producto);
            return producto;
        } catch (error) {
            return new HttpException(
                { error: error.driverError.detail },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: number) {
        return (await this.productosRepo.delete({ id })).affected;
    }
}