import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../interface/pedido.interface';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url: string = "http://localhost:3000/pedido"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }

  public post(pedido: Pedido): Observable<any> {
    return this.http.post(this.url, pedido, { responseType: 'text' });
  }

  public put(pedido: Pedido): Observable<any> {
    return this.http.put(this.url, pedido, { responseType: 'text' });
  }

  public delete(pedido: Pedido): Observable<any> {
    return this.http.delete(`${this.url}/${pedido}`, { responseType: 'text' });
  }
}