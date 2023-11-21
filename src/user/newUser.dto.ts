import { IsAlphanumeric, IsEmail, IsString } from "class-validator";

export class newUserDto {
    @IsString()
    type :string;

    @IsString()
    firstName :string;

    @IsString()
    lastName :string;

    @IsEmail()
    email :string;

    @IsString()
    password :string;
}