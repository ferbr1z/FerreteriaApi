import {
    HttpException,
    HttpStatus,
    Injectable,
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

    async findAll(): Promise<Producto[]> {
        const productos = await this.productosRepo.createQueryBuilder('producto')
            .innerJoinAndSelect('producto.categoria', 'categoria').getMany() // Cargar categoria

        productos.map((producto) => {
            producto.img_url = this.toBase64(producto.img_url);
            return producto;
        });

        return productos;
    }

    async findOne(id: number): Promise<Producto | HttpException> {
        try {
            // const producto = await this.productosRepo.findOne({ where: { id } });

            const producto = await this.productosRepo.createQueryBuilder('producto')
                .innerJoinAndSelect('producto.categoria', 'categoria')
                .where('producto.id = :id', { id }).getOne();

            if (!producto)
                return new HttpException(
                    { error: 'producto no encontrado' },
                    HttpStatus.NOT_FOUND,
                );

            producto.img_url = this.toBase64(producto.img_url);

            return producto;
        } catch (error) {
            return new HttpException(
                { error: error.driverError.detail },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    toBase64(imagePath: string): string {
        const image = fs.readFileSync(imagePath);
        const imageB64 = image.toString('base64');
        return imageB64;
    }

    async update(
        id: number,
        updateProductoDto: UpdateProductoDto,
    ): Promise<Producto> {
        const producto = await this.productosRepo.findOneBy({ id });
        Object.assign(producto, updateProductoDto);
        this.productosRepo.save(producto);
        return producto;
    }

    async remove(id: number): Promise<number> {
        return (await this.productosRepo.delete({ id })).affected;
    }
}