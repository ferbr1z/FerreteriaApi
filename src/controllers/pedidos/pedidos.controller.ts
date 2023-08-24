import { Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { CreatePedidoDto } from 'src/DTOs/pedidos/create-pedido.dto';
import { PedidosService } from 'src/services/pedidos/pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidoService : PedidosService){}

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
