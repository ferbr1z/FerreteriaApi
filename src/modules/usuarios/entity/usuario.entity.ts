import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, Unique } from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['ruc'])
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