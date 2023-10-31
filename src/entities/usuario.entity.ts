import { Exclude } from 'class-transformer';
import { ROLES } from 'src/constants/roles';
import { Pedido } from 'src/entities/pedido.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['ruc'])
  @Column()
  ruc: string;

  @Column()
  nombre: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.CLIENTE })
  rol: ROLES;
}
