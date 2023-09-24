import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {

    @Post()
    @HttpCode(200)
    public create() {

    }

}
