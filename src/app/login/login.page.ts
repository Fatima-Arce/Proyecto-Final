import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credenciales } from './../interfaces/credenciales.interface';
import { SesionService } from '../servicios/sesion.service';
import { Subscriber } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup = new FormGroup({
    ci: new FormControl<number | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)

  });
  
  constructor(
    private servicioSesion: SesionService,
    private servicioToast: ToastController,
  ) { }

  ngOnInit(): void {
  }
  public iniciarSesion() {
    this.actualizarValidacion();
    if (this.form.valid) {
      const cred: Credenciales = {
        ci: this.form.get('ci')?.value,
        password: this.form.get('password')?.value
      }
      this.servicioSesion.iniciar(cred).subscribe({
        next: (respuesta) => {
          this.servicioToast.create({
            header: 'Sesión iniciada',
            duration: 3500,
            color: 'success'
          }).then(t => t.present())
        },
        error: (e) => {
          console.error('Error al iniciar sesion', e);
          if (e.status === 401) {
            this.servicioToast.create({
              header: 'CI o contrasenña incorrecta',
              message: e.message,
              duration: 3500,
              color: 'danger'
            }).then(t => t.present())
          } else {
            this.servicioToast.create({
              header: 'Error al iniciar sesion',
              message: e.message,
              duration: 3500,
              color: 'danger'
            }).then(t => t.present())
          }
        }
      });
    }
    console.log(this.form.get('ci')?.value);
    console.log(this.form.get('password')?.value);

  }
  private actualizarValidacion() {
    if (this.form.get('ci')?.invalid) {
      this.form.get('ci')?.markAllAsTouched();
      this.form.get('ci')?.markAsDirty();
    }
    if (this.form.get('password')?.invalid) {
      this.form.get('password')?.markAllAsTouched();
      this.form.get('password')?.markAsDirty();
    }
  }
}