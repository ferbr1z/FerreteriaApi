import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthDto } from 'src/DTOs/auth/auth.dto';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { ILoginResult, IToken } from './auth.interfaces';

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    //create a function that returns a random number

    public async logIn(auth: AuthDto): Promise<string | ILoginResult> {
        const ruc = auth.ruc;
        const password = auth.password;

        const user = await this.usuariosService.findOneByRuc(ruc);

        if (!user) throw new BadRequestException('El ruc no existe')


        const isPasswordOk = this.usuariosService.comparePassword(password, user.password);
        const token = await this.generateJWT(user);
        if (isPasswordOk)
            return {
                nombre: user.nombre,
                userId: user.id,
                ruc: user.ruc,
                rol: user.rol,
                access_token: token.access_token
            };

        throw new BadRequestException('Contraseña incorrecta')

    }

    public async generateJWT(user: UsuarioDto) {
        const payload: IToken = { ruc: user.ruc, userId: user.id, rol: user.rol };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public validateToken({ token }): IToken {
        try {
            const decode = this.jwtService.decode(token) as IToken;

            if (decode.ruc && decode.userId) return decode;

            return null;

        } catch (error) {
            return null;
        }
    }

}
