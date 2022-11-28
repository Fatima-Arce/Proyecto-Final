import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ProductosService } from 'src/app/servicios/productos.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaUsuario: Usuario[] = [];

  public form: FormGroup = new FormGroup({
    idusuarioCtrl: new FormControl<number>(null, Validators.required),
    nombreCtrl: new FormControl<string>(null, Validators.required),
    apellidoCtrl: new FormControl<string>(null, Validators.required),
    direccionCtrl: new FormControl<string>(null, Validators.required),
    telefonoCtrl: new FormControl<number>(null, Validators.required),
    ciCtrl: new FormControl<number>(null, Validators.required),
    digitoRucCtrl: new FormControl<number>(null, Validators.required),
    correoCtrl: new FormControl<string>(null, Validators.required),
    passwordCtrl: new FormControl<string>(null, Validators.required)
  });


  constructor(
    private servicioUsuario: UsuarioService,
    private servicioToast: ToastController,
    private servicioProductos: ProductosService
  ) { }

  private cargarUsuario() {
    this.servicioUsuario.get().subscribe({
      next: (usuario) => {
        this.listaUsuario = usuario;
      },
      error: (e) => {
        console.error('Error al cargar Usuario', e);
        this.servicioToast.create({
          header: 'Error al cargar Usuario',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  guardar(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.modo === 'Registrar') {
        this.registrar();
      }else{
        this.editar();
      }     
    }
  }

  private registrar() {
    const usuario: Usuario = {
      idusuario: this.form.controls.idusuarioCtrl.value,
      nombre: this.form.controls.nombreCtrl.value,
      apellido: this.form.controls.apellidoCtrl.value,
      direccion: this.form.controls.direccionCtrl.value,
      telefono: this.form.controls.telefonoCtrl.value,
      ci: this.form.controls.ciCtrl.value,
      digitoRuc: this.form.controls.digitoRucCtrl.value,
      correo: this.form.controls.correoCtrl.value,
      password: this.form.controls.passwordCtrl.value,
      
    }
    this.servicioUsuario.post(usuario).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Exito',
          message: 'Se registro el usuario',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar usuario', e);
        this.servicioToast.create({
          header: 'Error al registrar usuario',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }

  private editar() {
    const usuario: Usuario = {
      idusuario: this.form.controls.idusuarioCtrl.value,
      nombre: this.form.controls.nombreCtrl.value,
      apellido: this.form.controls.apellidoCtrl.value,
      direccion: this.form.controls.direccionCtrl.value,
      telefono: this.form.controls.telefonoCtrl.value,
      ci: this.form.controls.ciCtrl.value,
      digitoRuc: this.form.controls.digitoRucCtrl.value,
      correo: this.form.controls.correoCtrl.value,
      password: this.form.controls.passwordCtrl.value,
      
    }
    this.servicioUsuario.put(usuario).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Exito',
          message: 'Se editó el usuario',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al editar usuario', e);
        this.servicioToast.create({
          header: 'Error al editar usuario',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }
  
}
