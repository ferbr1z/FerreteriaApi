import { ROLES } from "src/constants/roles";

export interface IToken {
    ruc: string;
    userId: number;
    rol:ROLES;
}

export interface ILoginResult {
    nombre: string,
    ruc: string,
    userId: number,
    rol:ROLES;
    access_token: string;
}