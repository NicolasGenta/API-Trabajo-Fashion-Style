import { IsNumber, IsString } from "class-validator";

export class udpatePasswordDto {
    @IsNumber()
    user_id: number;
    @IsString()
    password: string;
}