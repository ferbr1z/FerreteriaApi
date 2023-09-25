import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class ServeUsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    ruc: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre: string;

    @Exclude()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    direccion: string;

}