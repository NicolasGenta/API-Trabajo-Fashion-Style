import { Injectable } from '@nestjs/common';
import { Producto } from './producto.interface';

const BASE_URL = "http://localhost:3030/productos/";

@Injectable()
export class ProductoService {
    async crearProducto(body) {
        try {
            if (Object.keys(body).length > 1) {
                const id = await this.setId();
                const { nombre, marca, categoria, descripcion, precio, talla, img } = body;
                const nuevoProducto = { id, nombre, marca, categoria, descripcion, precio, talla, img };
                const res = await fetch(BASE_URL, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProducto),
                })
                const parsed = await res.json();
                return parsed;
            } else {
                throw new Error('No se ha podido crear el recurso');
            }
        } catch (error) {
            throw new Error(`Se ha producido un error: ${error}`);
        }

    }
    private async setId(): Promise<number> {
        const res = await this.getProductos();
        const id = res.pop().id + 1;
        return id;
    }

    async getProductoById(id): Promise <Producto> {
        try{
            const res = await fetch(BASE_URL + id);
            if(!res.ok) {
                throw new Error (`Error al obtener los datos: ${res.status} - ${res.statusText}`);
            }
            const parsed = await res.json();
            return parsed;
        }catch (err) {
            throw new Error (`Error al obtener los datos: ${err.status} - ${err.statusText}`);
        }
    }

    async getProductos(): Promise<Producto[]> {
        try {
            const res = await fetch(BASE_URL);
            if (!res.ok) {
                throw new Error(`Error al obtener los datos: ${res.status} - ${res.statusText}`);
            }
            const parsed = await res.json()
            return parsed;
        } catch (err) {
            throw new Error(`Error al obtener los datos: ${err.status} - ${err.statusText}`);
        }
    }
}
