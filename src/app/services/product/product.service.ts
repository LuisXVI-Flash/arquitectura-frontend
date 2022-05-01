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

  addProduct(id: string, pac: string) {
    const body = {
      id: id,
      pac: pac,
      estado: 0
    };
    
    return this.http.post<any>(`${this.endpoint}product/add`, body);
  }

  getList() {
    return this.http.get<any>(`${this.endpoint}product/list`)
  }

  updateProduct(productId: number, id: string, pac: string, estado: string) {
    const body = {
      productId: productId,
      id: id,
      pac: pac,
      estado: estado
    }
    return this.http.put<any>(`${this.endpoint}product/edit`, body);
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.endpoint}product/delete/${id}`);
  }
}
