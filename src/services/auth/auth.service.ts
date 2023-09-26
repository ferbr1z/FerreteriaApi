import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthDto } from 'src/DTOs/auth/auth.dto';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    //create a function that returns a random number

    public async logIn(auth: AuthDto) {
        const ruc = auth.ruc;
        const password = auth.password;
      
        const user = await this.usuariosService.findOneByRuc(ruc);

        if(!user) return "Ruc o contraseña incorrecta";

        const isPasswordOk = await this.usuariosService.comparePassword(password, user.password);
        if (isPasswordOk) {
            
            return this.generateJWT(user);
        }

        return "Ruc o contraseña incorrecta";

    }

    public async generateJWT(user: UsuarioDto) {
        const payload = { ruc: user.ruc, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
