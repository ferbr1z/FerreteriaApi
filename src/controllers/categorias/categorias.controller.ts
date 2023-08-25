import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('categorias')
export class CategoriasController {

    @Post()
    @HttpCode(200)
    create(){

    }

    @Get()
    findAll(){

    }

    @Get(":id")
    findOne(@Param("id") id:string){
        
    }

}
