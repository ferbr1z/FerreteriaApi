import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateProductoDto {
    @ApiProperty()
    @IsNotEmpty()
    ruc: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    direccion: string;

}