import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { UsuariosController } from 'src/controllers/usuarios/usuarios.controller';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [TypeOrmModule.forFeature([Usuario]), UsuariosService]
})
export class UsuariosModule { }
