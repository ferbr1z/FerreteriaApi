import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UsuarioQueryDto {
  @ApiPropertyOptional({ description: 'RUC del usuario' })
  @IsOptional()
  @IsString()
  ruc: string;

  @ApiPropertyOptional({ description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ description: 'Teléfono del usuario' })
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiPropertyOptional({ description: 'Dirección del usuario' })
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiPropertyOptional({ description: 'Número de página' })
  @IsOptional()
  @IsNumber()
  pag: number;
}
