import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ruc : string;

    @Column()
    nombre: string;

    @Column()
    password: string;


    @Column()
    telefono: string;

    @Column()
    direccion: string;

}