import { Body, Controller, Get, HttpCode, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreatePedidoDto } from 'src/DTOs/pedidos/create-pedido.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PedidosService } from 'src/services/pedidos/pedidos.service';

@UseGuards(RolesGuard)
@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidoService : PedidosService){}

    @Roles('CLIENTE')
    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) nvPedido:CreatePedidoDto){
        return await this.pedidoService.create(nvPedido);
    }

    @Get()
    async findAll(){
        return await this.pedidoService.findAll();
    }
    
}
