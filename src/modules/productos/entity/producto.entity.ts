import { Categoria } from 'src/modules/categorias/entity/categoria.entity';
import { PedidoDetalle } from 'src/modules/pedidos-detalles/entity/pedido-detalle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: "" })
  codigo: string;

  @Column({ default: "" })
  descripcion: string;

  @Column()
  precio: number;

  @ManyToOne((type) => Categoria, categoria => categoria.producto)
  @JoinColumn()
  categoria: Categoria;

  @Column({ default: null })
  img_url: string;


}