import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  precio: number;

  @Column({ default: null })
  img_url: string;
}