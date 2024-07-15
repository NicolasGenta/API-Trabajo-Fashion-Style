import { IsString } from "class-validator";

export class userLoginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}