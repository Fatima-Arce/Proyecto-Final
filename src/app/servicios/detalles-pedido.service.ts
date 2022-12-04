import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallesPedido } from '../interface/detalles-pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class DetallesPedidoService {

  url: string = "http://localhost:3000/detallespedido"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<DetallesPedido[]> {
    return this.http.get<DetallesPedido[]>(this.url);
  }

  public post(detallespedido: DetallesPedido): Observable<any> {
    return this.http.post(this.url, detallespedido, { responseType: 'text' });
  }

  public put(detallespedido: DetallesPedido): Observable<any> {
    return this.http.put(this.url, detallespedido, { responseType: 'text' });
  }

  public delete(detallespedido: DetallesPedido): Observable<any> {
    return this.http.delete(`${this.url}/${detallespedido.iddetallesPedido}`, { responseType: 'text' });
  }
}
