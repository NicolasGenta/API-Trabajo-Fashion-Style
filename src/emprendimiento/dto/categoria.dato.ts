import { IsString } from "class-validator";

export class CategoryDTO {
    @IsString()
    nombre_categoria :string
}