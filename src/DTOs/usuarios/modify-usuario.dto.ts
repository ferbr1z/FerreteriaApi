import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class ModifyUsuarioDto {
  @ApiProperty()
  @IsOptional()
  ruc: string;

  @ApiProperty()
  @IsOptional()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  telefono: string;

  @ApiProperty()
  @IsOptional()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  rol: ROLES;
}
