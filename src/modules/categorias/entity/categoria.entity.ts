import { Producto } from "src/modules/productos/entity/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Producto, producto => producto.categoriaId)
    producto: Producto[];
}