import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = "http://localhost:3000/producto"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  public post(producto: Producto): Observable<any>{
    return this.http.post(this.url, producto, { responseType: 'text' });
  }

  public put(producto: Producto): Observable<any>{
    return this.http.put(this.url, producto, { responseType: 'text' });
  }

  public delete(producto: Producto): Observable<any> {
    return this.http.delete(`${this.url}/${producto.idproducto}`, { responseType: 'text' });
  }
}

