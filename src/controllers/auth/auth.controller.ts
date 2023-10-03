import { Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/DTOs/auth/auth.dto';
import { IToken } from 'src/services/auth/auth.interfaces';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    @HttpCode(200)
    public async logIn(@Body(new ValidationPipe()) auth: AuthDto) : Promise<string | IToken> {
        return this.authService.logIn(auth);
    }

    @Get("login")
    public get(){
        return "haz un login aqui"
    }

    @Post("validate")
    @HttpCode(200)
    public async validateToken(@Body() token)  {
        return await this.authService.validateToken(token);
    }

}
