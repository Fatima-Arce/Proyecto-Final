import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit {

  public listaUsuario: Usuario[] = [];

  public idusuario: number | null = null;
  public nombre: string | null = null;
  public apellido: string | null = null;
  public direccion: string | null = null;
  public telefono: number | null = null;
  public ci: number | null = null;
  public digitoRuc: number | null = null;
  public correo: string | null = null;
  public password: string | null = null;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioToast: ToastController
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

}
