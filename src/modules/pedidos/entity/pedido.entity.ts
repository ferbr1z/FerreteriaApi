import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

enum EstadoPedido {
  PENDIENTE = "pendiente",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado"
}

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(()=>PedidoDetalle, detalle => detalle.pedido)
  detalles: PedidoDetalle[];

  @CreateDateColumn()
  fechaCreacion : Date;
  
  @Column({ type: "enum", enum: EstadoPedido, default: EstadoPedido.PENDIENTE })
  estado: EstadoPedido;

}