export interface User {
    rol: string 
    estado: boolean
    google: boolean
    nombre: string
    correo: string
    img: string
    uid: string
}
export interface listaUsers {
    usuario: User[]
    total: number
}