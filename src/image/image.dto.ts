import { IsBase64 } from "class-validator";

export class ImageDto {
    @IsBase64()
    image: string
}