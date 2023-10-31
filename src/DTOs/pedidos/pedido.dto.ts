import { IsNotEmpty } from 'class-validator';

export class PedidoDto {
  @IsNotEmpty()
  detalles: any[];

  @IsNotEmpty()
  autor: number;

  @IsNotEmpty()
  fechaCreacion: Date;

  @IsNotEmpty()
  estado: string;
}
