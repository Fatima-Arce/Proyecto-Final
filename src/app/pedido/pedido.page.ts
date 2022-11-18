import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Pedido } from '../interfaces/pedido.interface';
import { PedidoService } from '../servicios/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public listaPedido: Pedido[] = [];
  public cargandoPedido: boolean = false;

  constructor(
    private servicioPedido: PedidoService,
    private servicioToast: ToastController
  ) { }

  ngOnInit() {
    this.cargarPedido();
  }

  public cargarPedido(){
    this.refresher?.complete();
    this.cargandoPedido = true;
    this.servicioPedido.get().subscribe({
      next: (pedido) => {
        this.listaPedido = pedido;
        this.cargandoPedido = false;
      },
      error: (e) => {
        console.error('Error al consultar pedido', e);
        this.cargandoPedido = false;
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

}
