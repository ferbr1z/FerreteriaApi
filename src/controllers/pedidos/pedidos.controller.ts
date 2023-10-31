import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePedidoDto } from 'src/DTOs/pedidos/create-pedido.dto';
import { PedidoQueryDto } from 'src/DTOs/pedidos/pedido-query.dto';
import { UpdatePedidoDto } from 'src/DTOs/pedidos/update-pedido.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PedidosService } from 'src/services/pedidos/pedidos.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {}

  @ApiOperation({ summary: 'Rol requerido: CLIENTE' })
  @Roles('CLIENTE')
  @Post()
  @HttpCode(200)
  async create(@Body(new ValidationPipe()) nvPedido: CreatePedidoDto) {
    return await this.pedidoService.create(nvPedido);
  }

  @Get()
  async findAll(@Query() query: PedidoQueryDto) {
    return await this.pedidoService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.pedidoService.findOne(id);
  }

  // este metodo actualiza el pedido
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }
}
