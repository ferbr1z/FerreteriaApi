import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthDto } from 'src/DTOs/auth/auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuariosService) { }

    //create a function that returns a random number


    public async logIn(auth: AuthDto) {

    }

}
