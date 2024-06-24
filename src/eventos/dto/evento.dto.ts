import { IsDate, IsLatLong, IsString } from "class-validator";

export class EventDto {
    @IsString()
    nombre_evento: string;

    @IsString()
    descripcion: string;

    @IsDate()
    fecha_inicio: string;

    @IsDate()
    fecha_fin: string;

    @IsString()
    lugar: string

    @IsLatLong()
    geom: string;
}