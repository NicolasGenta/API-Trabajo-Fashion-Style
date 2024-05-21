import { Controller, Get, Param } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService : ImageService){}

    @Get()
    getImage(@Param() id: string) {
        const response = this.imageService.getImage(id);

        return response;
    }
}
