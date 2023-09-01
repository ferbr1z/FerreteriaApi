import { ApiProperty } from "@nestjs/swagger/dist";
import { IsNotEmpty } from "class-validator";

export class CreateCategoria {
    @ApiProperty()
    @IsNotEmpty()
    nombre: string;
}