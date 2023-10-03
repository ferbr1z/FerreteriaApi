import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/DTOs/usuarios/create-usuario.dto';
import { ModifyUsuarioDto } from 'src/DTOs/usuarios/modify-usuario.dto';
import { UsuarioListDto } from 'src/DTOs/usuarios/usuario-list.dto';
import { UsuarioQueryDto } from 'src/DTOs/usuarios/usuario-query.dto';
import { UsuarioDto } from 'src/DTOs/usuarios/usuario.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/constants/roles';

@UseGuards(AuthGuard, RolesGuard)
@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioService : UsuariosService){}

    @Roles('ADMIN')
    @Post()
    @HttpCode(200)
    public create(@Body(new ValidationPipe()) newUser: CreateUsuarioDto) {         
        return this.usuarioService.create(newUser);
    }

    @Roles(ROLES.VENDEDOR)
    @Get()
    public findAll(@Query() query: UsuarioQueryDto): Promise<UsuarioListDto> {
        return this.usuarioService.findAll(query);
    }

    @PublicAccess()
    @Get(':id')
    public async findOne(@Param('id') id: number) : Promise<UsuarioDto> {
        return await this.usuarioService.findOne(id);
    }

    @Roles('ADMIN')
    @Patch(':id')
    update(@Param('id') id:number, @Body() updateUserDto : ModifyUsuarioDto){
        return this.usuarioService.update(id, updateUserDto);
    }
    
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id:number){
        return this.usuarioService.remove(id);
    }

}
