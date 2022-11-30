import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../servicios/usuario.service';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioUsuarioComponent) formularioUsuario!: FormularioUsuarioComponent

  public listaUsuario: Usuario[] = [];
  public cargandoUsuario: boolean = false;
  public modalVisible: boolean = false;

  private usuarioSeleccionado: Usuario | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  public cargarUsuario(){
    this.refresher?.complete();
    this.cargandoUsuario = true;
    this.servicioUsuario.get().subscribe({
      next: (usuario) => {
        this.listaUsuario = usuario;
        this.cargandoUsuario = false;
      },
      error: (e) => {
        console.error("Error al consultar usuario", e);
        this.cargandoUsuario = false;
        this.servicioToast.create({
          header: 'Error al cargar usuario',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
        
    });
  }

  public nuevo(){
    this.modoFormulario = 'Registrar';
    this.usuarioSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(usuario: Usuario){
    this.usuarioSeleccionado = usuario;
    this.formularioUsuario.modo = 'Editar';
    this.modalVisible = true;
    
  }

  public cargarDatosEditar(){
    if(this.modoFormulario === 'Editar') {
      this.formularioUsuario.modo = this.modoFormulario;
      this.formularioUsuario.form.controls.idusuarioCtrl.setValue(this.usuarioSeleccionado.idusuario);
      this.formularioUsuario.form.controls.nombreCtrl.setValue(this.usuarioSeleccionado.nombre);
      this.formularioUsuario.form.controls.apellidoCtrl.setValue(this.usuarioSeleccionado.apellido);
      this.formularioUsuario.form.controls.direccionCtrl.setValue(this.usuarioSeleccionado.direccion);
      this.formularioUsuario.form.controls.telefonoCtrl.setValue(this.usuarioSeleccionado.telefono);
      this.formularioUsuario.form.controls.ciCtrl.setValue(this.usuarioSeleccionado.ci);
      this.formularioUsuario.form.controls.digitoRucCtrl.setValue(this.usuarioSeleccionado.digitoRuc);
      this.formularioUsuario.form.controls.correoCtrl.setValue(this.usuarioSeleccionado.correo);
      this.formularioUsuario.form.controls.passwordCtrl.setValue(this.usuarioSeleccionado.password);
    }
  }

  public confirmarEliminacion(usuario: Usuario) {
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el usuario?',
      message: `${usuario.idusuario} - ${usuario.nombre} - ${usuario.apellido} - ${usuario.direccion} - ${usuario.telefono} - ${usuario.ci} - ${usuario.digitoRuc} - ${usuario.correo} (${usuario.password})`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(usuario)                 
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(usuario: Usuario) {
    this.servicioUsuario.delete(usuario).subscribe({
      next: () => {
        this.cargarUsuario();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El usuario se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar usuario', e);
        this.servicioToast.create({
          header: 'Error al eliminar',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

}
