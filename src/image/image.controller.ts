import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService : ImageService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file : Express.Multer.File, @Res() response) {
        if (!file) {
            return response.status(400).json({ message: 'No file uploaded' });
          }
          console.log(file); // Aquí tienes acceso al archivo subido
          return response.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
        }
    }

