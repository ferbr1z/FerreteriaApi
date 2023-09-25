import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from 'src/DTOs/auth/auth.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post()
    @HttpCode(200)
    public async logIn(@Body() auth: AuthDto) {
        return this.authService.logIn(auth);
    }

}
