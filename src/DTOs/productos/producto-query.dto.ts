import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class ProductoQueryDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nombre: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    codigo: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    categoria: number
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    pag: number;

}