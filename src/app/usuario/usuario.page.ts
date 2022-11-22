import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public listaUsuario: Usuario[] = [];
  public cargandoUsuario: boolean = false;
  public modalVisible: boolean = false;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioToast: ToastController
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
    this.modalVisible = true;
  }

}
