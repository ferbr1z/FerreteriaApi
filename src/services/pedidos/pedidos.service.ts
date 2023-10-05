import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePedidoDto } from 'src/DTOs/pedidos/create-pedido.dto';
import { UpdatePedidoDto } from 'src/DTOs/pedidos/update-pedido.dto';
import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Pedido } from 'src/modules/pedidos/entity/pedido.entity';
import { DataSource, Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { Usuario } from 'src/modules/usuarios/entity/usuario.entity';
import { PedidoQueryDto } from 'src/DTOs/pedidos/pedido-query.dto';
import { itemsPerPage } from 'src/config';
import { PedidoListDto } from 'src/DTOs/pedidos/pedido-List.dto';
import { PedidoDto } from 'src/DTOs/pedidos/pedido.dto';

@Injectable()
export class PedidosService {
    constructor(@InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
        private dataSource: DataSource,
        private readonly usuarioService: UsuariosService) { }

    async create(nvPedido: CreatePedidoDto) {

        const { detalles, autorId, ...pedidoData } = nvPedido;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            const autor = await this.usuarioService.findOne(autorId) as Usuario;

            // Crear el pedido principal y obtener su ID
            const pedido = await queryRunner.manager.save(Pedido, { ...pedidoData, autor });

            // Asociar y crear los detalles con el ID del pedido
            const detallePromises = detalles.map(async detalle => {
                const detalleEntity = this.dataSource.manager.create(PedidoDetalle, {
                    ...detalle,
                    pedido: pedido, // Asociar el detalle con el pedido creado
                });
                return await queryRunner.manager.save(detalleEntity);
            });
            await Promise.all(detallePromises);

            // Se completa la transacción
            await queryRunner.commitTransaction();
            return { success: true };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Ha ocurrido un error en la transacción');
        } finally {
            // Aca se libera el queryRunner instanciado
            await queryRunner.release();
        }

    }

    async findAll(query: PedidoQueryDto): Promise<PedidoListDto> {

        const { autorId, autorNombre, autorRuc, pag, ...q } = query;

        const skip = pag ? ((pag - 1) * itemsPerPage) : 0;

        const queryBuilder = this.pedidoRepository.createQueryBuilder('pedido')
            .innerJoinAndSelect('pedido.autor', 'autor') // Cargar autor
            .innerJoinAndSelect('pedido.detalles', 'detalle') // Cargar detalles
            .innerJoinAndSelect('detalle.producto', 'producto') // Opcional: Cargar productos en detalle

        if (autorId) queryBuilder.andWhere('autor.id = :autorId', { autorId });
        if (autorNombre) queryBuilder.andWhere('autor.nombre ILIKE :autorNombre', { autorNombre: `%${autorNombre}%` });
        if (autorRuc) queryBuilder.andWhere('autor.ruc ILIKE :autorRuc', { autorRuc : `%${autorRuc}%` });

        const pedidos = await queryBuilder.skip(skip).take(itemsPerPage).getMany();
        const totalItems = await queryBuilder.getCount();
        const thereIsNextPage = (totalItems / itemsPerPage - skip) >= 1;

        const pedidosList: PedidoListDto = { thereIsNextPage, totalItems, pedidos };

        return pedidosList;
    }

    async findOne(id: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findOne({ where: { id } });
        return pedido
    }

    async update(id: number, updatePedidoDto: UpdatePedidoDto) {
        await this.pedidoRepository.update(id, updatePedidoDto);
        return await this.pedidoRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.pedidoRepository.delete(id);
    }

}
