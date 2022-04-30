export interface User {
    idtrabajador: number
    nombres: string
    apellidos: string
    correo: string
    usuario: string
    estado: number
    idcargo_trabajador: number
}
export interface listaUsers {
    usuario: User[]
    total: number
}