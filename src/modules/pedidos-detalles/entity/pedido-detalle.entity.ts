import { Pedido } from "src/modules/pedidos/entity/pedido.entity";
import { Producto } from "src/modules/productos/entity/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PedidoDetalle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pedido, pedido => pedido.detalles)
    pedido: Pedido

    @ManyToOne((type) => Producto, producto => producto.id)
    @JoinColumn()
    producto: Producto

    @Column()
    cantidad: number;

}