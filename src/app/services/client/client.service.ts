import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endpoint: string = environment.be_url
  constructor(private http: HttpClient) { }

  addClient(nombres: string, apellidos: string, correo: string, dni: string, celular: string) {
    let body = {
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      dni: dni,
      celular: celular
    }

    return this.http.post<any>(`${this.endpoint}client/add`, body);
  }

  listClient() {
    return this.http.get<any>(`${this.endpoint}client/list`)
  }

  updateClient(idcliente: number, nombres: string, apellidos: string, correo: string, dni: string, celular: string) {
    let body = {
      idcliente: idcliente,
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      dni: dni,
      celular: celular
    }

    return this.http.put<any>(`${this.endpoint}client/edit/`, body);
  }

  deleteClient(idcliente: string) {
    return this.http.delete<any>(`${this.endpoint}client/delete/${idcliente}`);
  }
}
