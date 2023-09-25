import { ApiProperty } from "@nestjs/swagger/dist";
import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    ruc: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}