import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { DetallesPedido } from '../interfaces/detalles-pedido.interface';
import { DetallesPedidoService } from '../servicios/detalles-pedido.service';
import { DetallesPedido } from '../interfaces/detalles-pedido.interface';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.page.html',
  styleUrls: ['./detalles-pedido.page.scss'],
})
export class DetallesPedidoPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

<<<<<<< HEAD
=======

>>>>>>> 2fc5e63f038c29df5d49eeae7929d91bed76f54c
  public listaDetallesPedido: DetallesPedido[] = [];
  public cargandoDetallesPedido: boolean = false;
  public modalVisible: boolean = false;

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
    this.modalVisible = true;
  }
}
