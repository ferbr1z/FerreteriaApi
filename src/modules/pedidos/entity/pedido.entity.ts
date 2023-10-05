import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Usuario } from 'src/modules/usuarios/entity/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoPedido } from 'src/constants/pedido-estados';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PedidoDetalle, detalle => detalle.pedido)
  detalles: PedidoDetalle[];

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn()
  autor: Usuario;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ type: "enum", enum: EstadoPedido, default: EstadoPedido.PENDIENTE })
  estado: EstadoPedido;

}