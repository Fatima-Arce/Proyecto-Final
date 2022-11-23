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

  public idusuarioValidado: boolean = true;
  public nombreValidado: boolean = true;
  public apellidoValidado: boolean = true;
  public direccionValidado: boolean = true;
  public telefonoValidado: boolean = true;
  public ciValidado: boolean = true;
  public digitoRucValidado: boolean = true;
  public correoValidado: boolean = true;
  public passwordValidado: boolean = true;


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

  guardar(){
    this.validar();
  }

  private validar(): boolean {
    this.idusuarioValidado = this.idusuario !== null;
    this.nombreValidado = this.nombre !== null;
    this.apellidoValidado = this.apellido !== null;
    this.direccionValidado = this.direccion !== null;
    this.telefonoValidado = this.telefono !==null  && this.telefono > 0;
    this.ciValidado = this.ci !== null  && this.ci > 0;
    this.correoValidado = this.correo !== null;
    this.passwordValidado = this.password !== null;
    return this.idusuarioValidado && this.nombreValidado && this.apellidoValidado && this.direccionValidado && this.telefonoValidado && this.ciValidado && this.correoValidado && this.passwordValidado

  }

}
