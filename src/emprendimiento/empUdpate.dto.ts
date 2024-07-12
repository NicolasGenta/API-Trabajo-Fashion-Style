import { IsBoolean, IsNumber , IsString} from "class-validator";

export class emprendimientoUdpatedDto {
    @IsNumber()
    id: number;
    @IsString()
    nombre :string;
    @IsNumber()
    estado_id :number;
}