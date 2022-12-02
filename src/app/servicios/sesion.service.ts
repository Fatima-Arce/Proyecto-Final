import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciales } from '../interfaces/credenciales.interface';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private url: string = "http://localhost:3000/sesion";
  token: string | null = null;
  private timer: any;

  constructor(
    private http: HttpClient
  ) { 
    Preferences.get({key: 'token'}).then(pref => {
      this.token = pref.value;
      this.procesarToken(pref.value);
    }).catch(e =>{
      console.error('Error al cargar tokem desde preferences', e);
    })
  }

  public iniciar(cred: Credenciales): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.url}/iniciar`, cred).pipe(
      tap( resp => {
        this.token = resp.token;
        Preferences.set({key: 'token', value: resp.token});
        this.procesarToken(resp.token);
      })
    );
  }

  private mantener(token: string): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.url}/mantener`, { token });
  }

  private procesarToken(token: string){
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const expiracion: Date | null = jwtHelper.getTokenExpirationDate(token);
    if(expiracion){
      const renovacion: Date = new Date(expiracion.getTime()-20000);
      const ejecutarEn: number = renovacion.getTime()-Date.now();
      this.timer = setTimeout(()=>{
        this.mantener(token).subscribe({
          next: (resp) => {
            console.log('Nuevo token recibido');
            this.token = resp.token;
            Preferences.set({key: 'token', value:  resp.token});
            this.procesarToken(resp.token);
          },
          error: (e) =>{
            console.error('Error al mantener sesion', e);
          }
        })
      }, ejecutarEn)
    }
  }

  cerrarSesion(){
    this.token = null;
    Preferences.remove({key: 'token'});
  }
}