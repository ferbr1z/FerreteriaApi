import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";
import { ROLES } from "src/constants/roles";

export class CreateUsuarioDto {

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

    @ApiProperty()
    @IsOptional()
    rol:ROLES;

}