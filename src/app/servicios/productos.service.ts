import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = "http://localhost:3000/libreria"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url);
  }

  public post(productos: Productos): Observable<any> {
    return this.http.post(this.url, productos, { responseType: 'text' });
  }

  public put(productos: Productos): Observable<any> {
    return this.http.put(this.url, productos, { responseType: 'text' });
  }

  public delete(productos: Productos): Observable<any> {
    return this.http.delete(`${this.url}/${productos}`, { responseType: 'text' });
  }
}

