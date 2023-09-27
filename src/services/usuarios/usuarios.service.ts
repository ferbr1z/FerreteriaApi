import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ILike, Repository } from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entity/usuario.entity';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { itemsPerPage, passwordHash, salt } from 'src/config';
import { UsuarioQueryDto } from 'src/DTOs/usuarios/usuario-query.dto';
import { classToPlain } from 'class-transformer';
import { count } from 'console';
import { UsuarioListDto } from 'src/DTOs/usuarios/usuario-list.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async create(usuario: CreateUsuarioDto): Promise<UsuarioDto> {
        usuario.password = await bcrypt.hash(passwordHash, salt);
        const newUser = await this.usuarioRepository.save(usuario);
        delete newUser.password;
        return newUser;
    }

    async findAll(query: UsuarioQueryDto): Promise<UsuarioListDto> {
        const { pag, nombre, ruc, direccion, ...q } = query;


        const skip = pag ? (pag - 1) * itemsPerPage : 0;

        const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')

        await queryBuilder.where('usuario.nombre ILIKE :nombre AND usuario.ruc ILIKE :ruc AND usuario.direccion ILIKE :direccion',
            { nombre: `%${nombre ?? ""}%`, ruc: `%${ruc ?? ""}%`, direccion: `%${direccion ?? ""}%` })

        Object.keys(q).forEach(key => {
            queryBuilder.andWhere(`usuario.${key} LIKE :${key}`, { [key]: q[key] })
            console.log(key);
        })

        const usuarios = await queryBuilder.skip(skip).take(itemsPerPage).getMany();

        const totalItems = await queryBuilder.getCount();
        const thereIsNextPage = parseInt((totalItems / itemsPerPage - skip).toFixed(0)) > 0;

        const usuariosList: UsuarioDto[] = usuarios.map(usuario => {
            const { password, ...usuarioLimpio } = usuario;
            return usuarioLimpio
        });
        return { usuariosList, totalItems, thereIsNextPage }
        // const { pag, nombre, ruc, ...q } = query;

        // const skip = pag ? (pag - 1) * itemsPerPage : 0;
        // let totalItems;

        // // Se filtran los resultados acorde a las querys
        // const users = await this.usuarioRepository.find({
        //     where: {
        //         nombre: nombre ? ILike(`%${nombre}%`) : ILike('%%'),
        //         ruc: ruc ? ILike(`%${ruc}%`) : ILike('%%'),
        //         ...q
        //     },
        //     skip: skip,
        //     take: itemsPerPage
        // });

        // return users.map(user => {
        //     const { password, ...userLimpio } = user;
        //     return userLimpio
        // });

    }

    async findOne(id: number): Promise<UsuarioDto> {
        return await this.usuarioRepository.findOne({ where: { id } });
    }


    async update(id: number, usuario: ModifyUsuarioDto): Promise<UsuarioDto> {
        if (usuario.password) {
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }

        await this.usuarioRepository.update(id, usuario);
        return await this.usuarioRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async findOneByRuc(ruc: string): Promise<Usuario> {
        const result = await this.usuarioRepository.findOneBy({ ruc });
        return result;
    }

    comparePassword(originalPassword: string, passwordHashed: string) {
        return bcrypt.compareSync(originalPassword, passwordHashed);
    }

}

