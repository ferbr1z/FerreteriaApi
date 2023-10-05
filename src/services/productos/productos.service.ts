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
import { itemsPerPage } from 'src/config';
import { ProductoListDto } from 'src/DTOs/productos/productoList.dto';
import { ProductoQueryDto } from 'src/DTOs/productos/producto-query.dto';

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

    async findAll(query: ProductoQueryDto): Promise<ProductoListDto> {
        const { pag, categoria, ...q } = query;

        const skip = pag ? ((pag - 1) * itemsPerPage) : 0;

        const queryBuilder = await this.productosRepo.createQueryBuilder('producto').innerJoinAndSelect('producto.categoria', 'categoria');

        if (categoria) {
            queryBuilder.andWhere('categoria.id = :categoria', { categoria });
        }

        Object.keys(q).forEach(key => {
            queryBuilder.andWhere(`producto.${key} LIKE :${key}`, { [key]: q[key] });
        });

        const productos = await queryBuilder.skip(skip).take(itemsPerPage).getMany();

        const totalItems = await queryBuilder.getCount();

        const thereIsNextPage = (totalItems / itemsPerPage - skip) >= 1;

        const productosList: ProductoListDto = { thereIsNextPage, totalItems, productos };

        return productosList;
    }

    async findOne(id: number): Promise<Producto | HttpException> {
        try {
            const producto = await this.productosRepo.createQueryBuilder('producto')
                .innerJoinAndSelect('producto.categoria', 'categoria')
                .where('producto.id = :id', { id }).getOne();

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