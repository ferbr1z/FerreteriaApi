import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entity/usuario.entity';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { ServeUsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { passwordHash, salt } from 'src/config';

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

    async findAll(): Promise<ServeUsuarioDto[]> {
        return await this.usuarioRepository.find();
    }

    async findOne(id: number): Promise<ServeUsuarioDto> {
        return await this.usuarioRepository.findOne({ where: { id } });
    }

    async update(id: number, usuario: ModifyUsuarioDto): Promise<ServeUsuarioDto> {
        await this.usuarioRepository.update(id, usuario);
        return await this.usuarioRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }


    async comparePassword(originalPassword: string, passwordHashed: string) {
        return await bcrypt.compare(originalPassword, passwordHashed);
    }

}

