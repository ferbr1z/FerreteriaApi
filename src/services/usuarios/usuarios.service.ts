import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import * as bcrypt from 'bcrypt';
import { itemsPerPage, salt } from 'src/config';
import { UsuarioQueryDto } from 'src/DTOs/usuarios/usuario-query.dto';
import { UsuarioListDto } from 'src/DTOs/usuarios/usuario-list.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuario: CreateUsuarioDto): Promise<UsuarioDto> {
    usuario.password = await bcrypt.hash(usuario.password, salt);
    const newUser = await this.usuarioRepository.save(usuario);
    delete newUser.password;
    return newUser;
  }

  async findAll(query: UsuarioQueryDto): Promise<UsuarioListDto> {
    const { pag, nombre, ruc, direccion, ...q } = query;

    const skip = pag ? (pag - 1) * itemsPerPage : 0;

    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario');

    await queryBuilder.where(
      'usuario.nombre ILIKE :nombre AND usuario.ruc ILIKE :ruc AND usuario.direccion ILIKE :direccion',
      {
        nombre: `%${nombre ?? ''}%`,
        ruc: `%${ruc ?? ''}%`,
        direccion: `%${direccion ?? ''}%`,
      },
    );

    Object.keys(q).forEach((key) => {
      queryBuilder.andWhere(`usuario.${key} LIKE :${key}`, { [key]: q[key] });
    });

    const usuariosList: UsuarioDto[] = await queryBuilder
      .skip(skip)
      .take(itemsPerPage)
      .getMany();
    const totalItems = await queryBuilder.getCount();
    const thereIsNextPage = totalItems / itemsPerPage - skip >= 1;

    return { totalItems, thereIsNextPage, usuariosList };
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
    const result = bcrypt.compareSync(originalPassword, passwordHashed);
    return result;
  }
}
