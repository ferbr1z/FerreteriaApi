import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorator';
import { IToken } from 'src/services/auth/auth.interfaces';
import { AuthService } from 'src/services/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly authService : AuthService,
    private readonly reflector: Reflector
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('No se ha enviado el token de autenticación');
    }
    
    const manageToken : IToken =  this.authService.validateToken({token});
    const {userId} = manageToken;
    
    const user = await this.usuarioService.findOne(userId);
    if(!user){
      throw new UnauthorizedException('El usuario no existe');
    }

    // porque esto esta mal?
    req['userId'] = userId;
    req['userRol'] = user.rol;

    return true;

  }

}