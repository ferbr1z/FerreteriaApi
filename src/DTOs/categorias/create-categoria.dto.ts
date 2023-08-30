import { IsNotEmpty } from "class-validator";

export class CreateCategoria {
    @IsNotEmpty()
    nombre: string;
}