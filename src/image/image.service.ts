import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {

    //Method that returns the image in base64
    getImage(id: string) {
        console.log(__dirname);
        
        const imagePath = path.join(__dirname, `/src/private/${id}.jpg`);

        return new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    }
}
