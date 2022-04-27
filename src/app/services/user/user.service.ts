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
    firstName: string, age: number,
    email: string, 
    password: string, roleId: string) {
    const body = {
      "nombre": firstName,
      "edad": age,
      "correo": email,
      "password": password,
      "rol": roleId,
      "img": ''
    };

    return this.http.post<any>(`${this.endpoint}api/usuarios`, body);
  }

  getList() {
    return this.http.get<listaUsers>(`${this.endpoint}api/usuarios?limit=`)
  }
  
  updateUser(
    id: string,
    firstName: string, img: string,
    email: string, roleId: string
  ) {
    let headers = new HttpHeaders()
    this.token = localStorage.getItem('access_token')
    headers = headers.set('x-token', this.token)
    const body = {
      "nombre": firstName,
      "correo": email,
      "img": img,
      "rol": roleId
    }

    return this.http.put<any>(`${this.endpoint}api/usuarios/${id}`, body, {headers: headers});
  }

  deleteUser(id: string) {
    console.log(id)
    let headers = new HttpHeaders()
    this.token = localStorage.getItem('access_token')
    headers = headers.set('x-token', this.token)
    return this.http.delete<any>(`${this.endpoint}api/usuarios/${id}`, {headers: headers});
  }
}
