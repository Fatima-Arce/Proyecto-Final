import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { DetallesPedidoService } from '../servicios/detalles-pedido.service';
import { DetallesPedido } from '../interfaces/detalles-pedido.interface';
import { FormularioDetallesPedidoComponent } from './formulario-detalles-pedido/formulario-detalles-pedido.component';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.page.html',
  styleUrls: ['./detalles-pedido.page.scss'],
})
export class DetallesPedidoPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioDetallesPedidoComponent) formularioDetallesPedido!: FormularioDetallesPedidoComponent

  public listaDetallesPedido: DetallesPedido[] = [];
  public cargandoDetallesPedido: boolean = false;
  public modalVisible: boolean = false;

  private detallesPedidoSeleccionado: DetallesPedido | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
    private servicioToast: ToastController
  ) { }

  ngOnInit() {
    this.cargarDetallesPedido();
  }

  public cargarDetallesPedido() {
    this.refresher?.complete();
    this.cargandoDetallesPedido = true;
    this.servicioDetallesPedido.get().subscribe({
      next: (DetallesPedido) => {
        this.listaDetallesPedido = DetallesPedido;
        this.cargandoDetallesPedido = false;
      },
      error: (e) => {
        console.error('Error al consultar DetallesPedido', e);
        this.cargandoDetallesPedido = false;
        this.servicioToast.create({
          header: 'Error al cargar DetallePedido',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    })
  }

  public nuevo(){
    this.modoFormulario = 'Registrar';
    this.detallesPedidoSeleccionado = null;
    this.modalVisible = true;   
  }

  public editar(detalllesPedido: DetallesPedido){
    this.detallesPedidoSeleccionado = detalllesPedido;
    this.formularioDetallesPedido.modo = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar() {
    if(this.modoFormulario === 'Editar') {
      this.formularioDetallesPedido.modo = this.modoFormulario;
      this.formularioDetallesPedido.form.controls.iddetallesPedidoCtrl.setValue(this.detallesPedidoSeleccionado.iddetallesPedido);
      this.formularioDetallesPedido.form.controls.idproductoCtrl.setValue(this.detallesPedidoSeleccionado.idproducto);
      this.formularioDetallesPedido.form.controls.cantidadCtrl.setValue(this.detallesPedidoSeleccionado.cantidad);
      this.formularioDetallesPedido.form.controls.precioCtrl.setValue(this.detallesPedidoSeleccionado.precio);
    }
  }
}
