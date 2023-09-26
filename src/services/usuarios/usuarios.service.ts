import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ILike, Repository } from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entity/usuario.entity';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { ServeUsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { itemsPerPage, passwordHash, salt } from 'src/config';
import { UsuarioQueryDto } from 'src/DTOs/usuarios/usuario-query.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async create(usuario: CreateUsuarioDto): Promise<ServeUsuarioDto> {
        usuario.password = await bcrypt.hash(passwordHash, salt);
        const newUser = await this.usuarioRepository.save(usuario);
        delete newUser.password;
        return newUser;
    }

    async findAll(query: UsuarioQueryDto): Promise<ServeUsuarioDto[]> {
        const { pag, nombre, ruc, ...q } = query;

        const skip = pag ? (pag - 1) * itemsPerPage : 0;

        // Se filtran los resultados acorde a las querys
        const users = await this.usuarioRepository.find({
            where: {
                nombre: nombre ? ILike(`%${nombre}%`) : ILike('%%'),
                ruc: ruc ? ILike(`%${ruc}%`) : ILike('%%'),
                ...q
            },
            skip: skip,
            take: itemsPerPage
        });

        return users.map(user => {
            const { password, ...userLimpio } = user;
            return userLimpio
        });

    }

    async findOne(id: number): Promise<ServeUsuarioDto> {
        return await this.usuarioRepository.findOne({ where: { id } });
    }


    async update(id: number, usuario: ModifyUsuarioDto): Promise<ServeUsuarioDto> {
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

    async comparePassword(originalPassword: string, passwordHashed: string) {
        return await bcrypt.compare(originalPassword, passwordHashed);
    }

}

