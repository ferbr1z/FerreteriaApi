import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EstadoPedido } from 'src/constants/pedido-estados';

export class PedidoQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  autorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  autorRuc: string;

  @ApiPropertyOptional()
  @IsOptional()
  autorNombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  fechaCreacion: Date;

  @ApiPropertyOptional()
  @IsOptional()
  estado: EstadoPedido;

  @ApiPropertyOptional()
  @IsOptional()
  pag: number;
}
