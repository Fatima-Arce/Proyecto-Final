import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libreria } from '../interfaces/libreria.interface';

@Injectable({
  providedIn: 'root'
})
export class LibreriaService {

  url: string = "http://localhost:3000/libreria"

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Libreria> {
    return this.http.get<Libreria[]>(this.url);
  }

  public post(libreria: Libreria): Observable<any> {
    return this.http.post(this.url, libreria, { responseType: 'text' });
  }

  public put(libreria: Libreria): Observable<any> {
    return this.http.put(this.url, libreria, { responseType: 'text' });
  }

  public delete(libreria: Libreria): Observable<any> {
    return this.http.delete(`${this.url}/${libreria}`, { responseType: 'text' });
  }
}