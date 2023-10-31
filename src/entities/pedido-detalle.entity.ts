import { Pedido } from 'src/entities/pedido.entity';
import { Producto } from 'src/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PedidoDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;

  @ManyToOne((type) => Producto, (producto) => producto.id)
  @JoinColumn()
  producto: Producto;

  @Column()
  cantidad: number;
}
