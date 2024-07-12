import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {

    uploadImage(img) {
        const folderPath = 'C:\\Users\\Luce\\Documents\\Develop\\Projects\\API-Trabajo-Fashion-Style\\img';
        const fileId = uuidv4();
        const fileName = `${fileId}.jpg`
        const filePath = path.join(folderPath, fileName);

        try {
            fs.writeFileSync(filePath, img.buffer);

            return fileName;
        }catch (err) {
            console.error('Error al guardar el archivo:', err);
            throw new Error('No se pudo cargar la imagen');
        }
    }

    deleteImage(name: string) {
        const folderPath = 'C:\\Users\\Luce\\Documents\\Develop\\Projects\\API-Trabajo-Fashion-Style\\img';
        const filePath = path.join(folderPath, name);

        try {
            if(fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Archivo ${name} eliminado correctamente`);
            } else {
                console.error(`El archivo ${name} no existe`);
                throw new Error('El archivo no existe');
            }
        } catch (err) {
            console.error('Error al eliminar el archivo:', err);
            throw new Error('No se pudo eliminar la imagen');
        }
    }
}
