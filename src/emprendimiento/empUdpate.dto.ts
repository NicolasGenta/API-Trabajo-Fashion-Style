import { IsBoolean, IsEmail, IsNumber , IsString} from "class-validator";

export class emprendimientoUdpatedDto {
    @IsNumber()
    id :number;
    @IsString()
    nombre :string;
    @IsNumber()
    estado :number;

}