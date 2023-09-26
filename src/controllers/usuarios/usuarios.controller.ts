import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import { UsuarioQueryDto } from 'src/DTOs/usuarios/usuario-query.dto';
import { ServeUsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioService : UsuariosService){}

    @Post()
    @HttpCode(200)
    public create(@Body(new ValidationPipe()) newUser: CreateUsuarioDto) {         
        return this.usuarioService.create(newUser);
    }

    @Get()
    public findAll(@Query() query: UsuarioQueryDto): Promise<ServeUsuarioDto[]> {
        return this.usuarioService.findAll(query);
    }

    @Get(':id')
    public findOne(@Param('id') id: number){
        return this.usuarioService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateUserDto : ModifyUsuarioDto){
        return this.usuarioService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.usuarioService.remove(id);
    }

}
