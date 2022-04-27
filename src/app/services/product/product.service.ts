import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { listaProducto } from 'src/app/entities/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token: any
  endpoint: string = environment.be_url
  constructor(private http: HttpClient) { }

  addProduct(firstName: string, descripcion: string, precio: number, idProducto: string, mac: string, img: string) {
    let headers = new HttpHeaders()
    this.token = localStorage.getItem('access_token')
    headers = headers.set('x-token', this.token)
    const body = {
      "nombre": firstName,
      "precio": precio,
      "descripcion": descripcion,
      "categoria": "61a7933a3daea00016e4f7cd",
      "img": img,
      "idProducto": idProducto,
      "mac":mac,
      "activo": false
    };
    
    return this.http.post<any>(`${this.endpoint}api/productos`, body, {headers: headers});
  }

  getList() {
    return this.http.get<listaProducto>(`${this.endpoint}api/productos`)
  }

  updateProduct(
    productId: string, firstName: string, descripcion: string, precio: number, idProducto: string, mac: string, img: string, estado: boolean 
  ) {
    let headers = new HttpHeaders()
    this.token = localStorage.getItem('access_token')
    headers = headers.set('x-token', this.token)
    const body = {
      "nombre": firstName,
      "precio": precio,
      "descripcion": descripcion,
      "disponible": true,
      "estado": estado,
      "categoria": "61a7933a3daea00016e4f7cd",
      "img": img,
      "idProducto": idProducto,
      "mac":mac,
      "activo": false
    }
    return this.http.put<any>(`${this.endpoint}api/productos/${productId}`, body, {headers: headers});
  }

  deleteProduct(id: string) {
    let headers = new HttpHeaders()
    this.token = localStorage.getItem('access_token')
    headers = headers.set('x-token', this.token)
    return this.http.delete<any>(`${this.endpoint}api/productos/${id}`, {headers: headers});
  }
}
