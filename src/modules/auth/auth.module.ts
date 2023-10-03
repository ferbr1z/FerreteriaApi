import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services/auth/auth.service';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';
import { Usuario } from '../usuarios/entity/usuario.entity';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    providers: [AuthService, UsuariosService],
    controllers:[AuthController],
    exports:[AuthService]
})
export class AuthModule { }
