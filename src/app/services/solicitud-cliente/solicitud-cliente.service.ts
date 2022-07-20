import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudClienteService {

  endpoint: string = environment.be_url
  constructor(private http: HttpClient, private router: Router) {  }

  verifyProduct (id: any, pac: any) {
    const body = {
      id: id, 
      pac: pac
    }
    return this.http.post<any>(`${this.endpoint}product/find`, body)
  }

  saveRequest (nombres: any, apellidos: any, email: any, dni: any, celular: any) {
    let idProducto = localStorage.getItem('token_id')
    const body = {
      nombres: nombres,
      apellidos: apellidos,
      correo: email,
      dni: dni,
      celular: celular,
      idproducto: idProducto
    }

    return this.http.post<any>(`${this.endpoint}solicitud/create`, body)
  }

  get isLogged (): boolean {
    let authToken = localStorage.getItem('token_id')
    return (authToken !== null)
  }

  logout (redirect: boolean = true) {
    localStorage.removeItem('token_id')
    if (redirect) {
      this.router.navigate(['/solicitudes'])
    }
  }

}
