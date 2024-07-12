
export class Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    img: any;
    category: number;
    emprendimiento: number;

    constructor(nombre: string, descripcion: string, precio: number, img: any, category: number, emprendimiento: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.category = category;
        this.emprendimiento = emprendimiento
    }
}