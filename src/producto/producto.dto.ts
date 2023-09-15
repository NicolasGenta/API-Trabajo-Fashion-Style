import {IsString, IsNumber, IsUrl, IsArray} from 'class-validator'
export class producDto {
    @IsString()
    nombre: string;
    @IsString()
    marca: string;
    @IsString()
    categoria: string;
    @IsString()
    descripcion: string;
    @IsNumber()
    precio: number;
    @IsArray()
    talla: string[];
    @IsUrl()
    img: string;

}