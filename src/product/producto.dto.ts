import {IsString, IsNumber, IsUrl, IsArray, IsBoolean} from 'class-validator'

export class producDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsNumber()
    precio: number;
    @IsUrl()
    img: string;
    @IsString()
    category: string;
    @IsNumber()
    emprendimiento: number;

}