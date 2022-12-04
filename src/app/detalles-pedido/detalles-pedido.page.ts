import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { DetallesPedidoService } from '../servicios/detalles-pedido.service';
import { DetallesPedido } from '../interface/detalles-pedido.interface';
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
    private servicioToast: ToastController,
    private serviocioAlert: AlertController
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

  public nuevo() {
    this.modoFormulario = 'Registrar';
    this.detallesPedidoSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(detalllesPedido: DetallesPedido) {
    this.detallesPedidoSeleccionado = detalllesPedido;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioDetallesPedido.modo = this.modoFormulario;
      this.formularioDetallesPedido.form.controls.iddetallesPedidoCtrl.setValue(this.detallesPedidoSeleccionado.iddetallesPedido);
      this.formularioDetallesPedido.form.controls.idproductoCtrl.setValue(this.detallesPedidoSeleccionado.idproducto);
      this.formularioDetallesPedido.form.controls.cantidadCtrl.setValue(this.detallesPedidoSeleccionado.cantidad);
      this.formularioDetallesPedido.form.controls.precioCtrl.setValue(this.detallesPedidoSeleccionado.precio);
      this.formularioDetallesPedido.form.controls.idpedidoCtrl.setValue(this.detallesPedidoSeleccionado.idpedido);
    }
  }

  public confirmarEliminacion(detalllesPedido: DetallesPedido) {
    this.serviocioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el detalle pedido?',
      message: `${detalllesPedido.iddetallesPedido} - ${detalllesPedido.idproducto} (${detalllesPedido.precio} - ${detalllesPedido.idpedido})`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(detalllesPedido)                 
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(detalllesPedido: DetallesPedido) {
    this.servicioDetallesPedido.delete(detalllesPedido).subscribe({
      next: () => {
        this.cargarDetallesPedido();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El detalle pedido se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar detalles pedido', e);
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
