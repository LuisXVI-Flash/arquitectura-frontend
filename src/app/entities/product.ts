export interface Producto {
    _id: string
    nombre: string 
    descripción: string
    precio: number
    idProducto: string
    mac: string
    img: string
    estado: boolean
}
export interface listaProducto {
    usuario: Producto[]
    total: number
}