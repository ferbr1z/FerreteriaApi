import { Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/DTOs/auth/auth.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    @HttpCode(200)
    public async logIn(@Body(new ValidationPipe()) auth: AuthDto) {
        return this.authService.logIn(auth);
    }

    @Get("login")
    public get(){
        return "haz un login aqui"
    }

}
