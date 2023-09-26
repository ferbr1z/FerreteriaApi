import { ApiProperty } from "@nestjs/swagger";
import { UsuarioDto } from "./usuario.dto";
import { IsNotEmpty } from "class-validator";

export class UsuarioListDto {
    
    @ApiProperty()
    @IsNotEmpty()
    usuariosList: UsuarioDto[];

    @ApiProperty()
    @IsNotEmpty()
    totalItems: number;

    @ApiProperty()
    @IsNotEmpty()
    thereIsNextPage: boolean;

}