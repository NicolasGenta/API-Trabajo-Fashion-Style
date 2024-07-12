import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Res() response) {
        if (!file) {
            return response.status(400).json({ message: 'No file uploaded' });
        }
        console.log(file); // Aquí tienes acceso al archivo subido
        return response.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
    }

    @Get()
    async getImage(@Query('filename') filename: string, @Res() res: Response) {
        console.log(filename);
        
        const basePath = 'C:\\Users\\Luce\\Documents\\Develop\\Projects\\API-Trabajo-Fashion-Style\\img';
        const imagePath = path.join(basePath, filename);
        if (await fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    }
}

