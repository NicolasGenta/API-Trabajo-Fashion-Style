import {IsString, IsNumber, IsUrl, IsArray, IsBoolean, IsOptional} from 'class-validator'

export class producDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsNumber()
    precio: number;
    @IsOptional()
    img: any;
    @IsNumber()
    category: number;
    @IsNumber()
    emprendimiento: number;

}