import { Injectable } from '@nestjs/common';
import { Producto } from './producto.interface';

const BASE_URL = "http://localhost:3030/productos/";
@Injectable()
export class ProductoService {
   async crearProducto(body){
    try{  
    if(Object.keys(body).length){

        const id = await this.setId();
            const {nombre, marca, categoria, descripcion, precio, talla,img} = body;
            const nuevoProducto = {id, nombre, marca, categoria, descripcion, precio, talla, img};
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto),
    
            })
            const parsed =await res.json();
            return parsed
    }else{
        return {}
    }  }catch(error){
        return{}

    }
      
    }
    private async setId(): Promise <number> {

        const res = await this.getProducto();   
        const id = res.pop().id + 1;
        return id;  
    }
  async getProductoById(id) {
    try{
    const res = await fetch (BASE_URL + id)    
    const parsed = await res.json()

    return parsed;  
    }catch(error){
        return {}
    }
   }
   async getProducto(): Promise <Producto[]> {
    try{

        const res = await fetch (BASE_URL)    
        const parsed = await res.json()
        return parsed; 
    } catch(error){
        return []
    }


        }
}
