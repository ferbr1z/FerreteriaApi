import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { CreatePedidoDto } from 'src/DTOs/pedidos/create-pedido.dto';
import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Pedido } from 'src/modules/pedidos/entity/pedido.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PedidosService {
    constructor(@InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
        private dataSource: DataSource,
        @InjectRepository(PedidoDetalle) private pedidoDetalleRepository: Repository<PedidoDetalle>) { }

    async create(nvPedido: CreatePedidoDto) {

        const { detalles, ...pedidoData } = nvPedido;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            // Crear el pedido principal y obtener su ID
            const pedido = await queryRunner.manager.save(Pedido, pedidoData);

            // Asociar y crear los detalles con el ID del pedido
            const detallePromises = detalles.map(async detalle => {
                const detalleEntity = this.dataSource.manager.create(PedidoDetalle, {
                    ...detalle,
                    pedido: pedido, // Asociar el detalle con el pedido creado
                });
                await queryRunner.manager.save(detalleEntity);
            });
            await Promise.all(detallePromises);

            // Se completa la transacción
            await queryRunner.commitTransaction();
            return { success: true };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return { success: false, error: error.message || 'Ha ocurrido un error en la transacción.' };
        } finally {
            // Aca se libera el queryRunner instanciado
            await queryRunner.release();
        }

    }

    async findAll(): Promise<Pedido[]> {
        const pedidos = await this.pedidoRepository.createQueryBuilder('pedido')
            .innerJoinAndSelect('pedido.detalles', 'detalle') // Cargar detalles
            .innerJoinAndSelect('detalle.producto', 'producto') // Opcional: Cargar productos en detalle
            .getMany();
        return pedidos;
    }

    async findOne(id: number): Promise<Pedido> {
        return await this.pedidoRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.pedidoRepository.delete(id);
    }

}
