import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  endpoint: string = environment.be_url
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<any>(`${this.endpoint}solicitud/all`)
  }

  getAttended() {
    return this.http.get<any>(`${this.endpoint}solicitud/attended`)
  }

  getUnattended() {
    return this.http.get<any>(`${this.endpoint}solicitud/unnatended`)
  }

  activateProduct(solicitud: any) {
    const body = {
      idsolicitud: solicitud.idsolicitud,
      idcliente: solicitud.idcliente,
      idproducto: solicitud.idproducto
    }
    return this.http.post<any>(`${this.endpoint}solicitud/activate`, body)
  }
}