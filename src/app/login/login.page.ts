import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credenciales } from '../interface/credenciales.interface';
import { SesionService } from '../servicios/sesion.service';
import { Subscriber } from 'rxjs';
import { ToastController } from '@ionic/angular';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup = new FormGroup({
    ciCtrl: new FormControl<number | null>(null, Validators.required),
    passwordCtrl: new FormControl<string | null>(null, Validators.required)

  });
  
  constructor(
    private servicioSesion: SesionService,
    private servicioToast: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public iniciarSesion() {
    this.servicioSesion.iniciar(this.getCredenciales()).subscribe({
       next: (resp) => {
        console.log('Inicio de sesion correcto',"el token es:", resp.token)
          this.servicioToast.create({
            header: 'Inicio de sesion correcto',
            duration: 3500,
            position: 'bottom',
            color: 'success'
          }).then(t => t.present());
          this.router.navigate(['/home'])
        },
        error: (e) => {
          if (e.status === 401) {
            this.servicioToast.create({
              header: 'Error al iniciar sesion',
              message: 'CI o contrasenña incorrecta',
              duration: 3500,
              position: "bottom",
              color: 'danger'
            }).then(t => t.present())
          }else{
            this.servicioToast.create({
              header:'Error al iniciar sesion',
              message: e.message,
              duration: 3000,
              position: 'bottom',
              color: 'danger'
            }).then(toast => toast.present());
          } 
       console.error('Error al iniciar sesion', e)
      }
    }) 
  }

  private getCredenciales(): Credenciales{
    return{
      ci: this.form.controls.ciCtrl.value,
      password: this.form.controls.passwordCtrl.value
    }
  }
}


