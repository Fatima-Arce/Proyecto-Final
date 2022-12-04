import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Pedido } from '../interface/pedido.interface';
import { PedidosService } from '../servicios/pedidos.service';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioPedidoComponent) formularioPedido!: FormularioPedidoComponent

  public listaPedidos: Pedido[] = [];
  public cargandoPedidos: boolean = false;
  public modalVisible: boolean = false;

  private PedidoSeleccionado: Pedido | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioPedidos: PedidosService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarPedidos();
  }

  public cargarPedidos() {
    this.refresher?.complete();
    this.cargandoPedidos = true;
    this.servicioPedidos.get().subscribe({
      next: (pedidos) => {
        this.listaPedidos = pedidos;
        this.cargandoPedidos = false;
      },
      error: (e) => {
        console.error('Error al consultar pedido', e);
        this.cargandoPedidos = false;
        this.servicioToast.create({
          header: 'Error al cargar pedido',
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
    this.PedidoSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(pedido: Pedido) {
    this.PedidoSeleccionado = pedido;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioPedido.modo = this.modoFormulario; 
      this.formularioPedido.form.controls.idpedidoCtrl.setValue(this.PedidoSeleccionado.idpedido);
      this.formularioPedido.form.controls.idusuarioCtrl.setValue(this.PedidoSeleccionado.idusuario);
      this.formularioPedido.form.controls.fechaPedidoCtrl.setValue(this.PedidoSeleccionado.fechaPedido);
      this.formularioPedido.form.controls.fechaEntregaCtrl.setValue(this.PedidoSeleccionado.fechaEntrega);
    }
  }

  public confirmarEliminacion(pedido: Pedido) {
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el pedido?',
      message: `${pedido.idpedido} - ${pedido.idusuario} (${pedido.fechaPedido})`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(pedido)                 
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(pedido: Pedido) {
    this.servicioPedido.delete(pedido).subscribe({
      next: () => {
        this.cargarPedido();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El pedido se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar pedido', e);
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
