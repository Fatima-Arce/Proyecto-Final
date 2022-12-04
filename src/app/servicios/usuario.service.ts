import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = "http://localhost:3000/usuario"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  public post(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario, { responseType: 'text' });
  }

  public put(usuario: Usuario): Observable<any> {
    return this.http.put(this.url, usuario, { responseType: 'text' });
  }

  public delete(usuario: Usuario): Observable<any> {
    return this.http.delete(`${this.url}/${usuario}`, { responseType: 'text' });
  }
}

