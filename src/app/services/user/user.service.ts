import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listaUsers, User } from 'src/app/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: any
  endpoint: string = environment.be_url
  constructor(private http: HttpClient) { }

  addUser(
    firstName: string, lastname: string,
    email: string, username: string, 
    password: string, roleId: string) {
    let body = {
      nombre: firstName,
      apellido: lastname,
      correo: email,
      usuario: username,
      password: password,
      rol: roleId,
    };

    return this.http.post<any>(`${this.endpoint}user/add`, body);
  }

  getList() {
    return this.http.get<any>(`${this.endpoint}user/list`)
  }
  
  updateUser(
    id: string, firstName: string, lastName: string,
    email: string, username: string, password: string, roleId: string, active: string
  ) {
    let body = {
      id: id,
      nombre: firstName,
      apellido: lastName,
      correo: email,
      username: username,
      password: password,
      rol: roleId,
      active: active
    }

    return this.http.put<any>(`${this.endpoint}user/edit/`, body);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.endpoint}user/delete/${id}`);
  }
}
