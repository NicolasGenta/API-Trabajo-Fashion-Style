import { IsString } from "class-validator";

export class RubroDto {
    @IsString()
    nombre_rubro : string
}