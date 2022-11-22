import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Productos } from '../interfaces/productos.interface';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public listaProductos: Productos[] = [];
  public cargandoProductos: boolean = false;
  public modalVisible: boolean = false;

  constructor(
    private servicioProductos: ProductosService,
    private servicioToast: ToastController
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  public cargarProductos() {
    this.refresher?.complete();
    this.cargandoProductos = true;
    this.servicioProductos.get().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
        this.cargandoProductos = false;
      },
      error: (e) => {
        console.error("Error al consultar pedido", e);
        this.cargandoProductos = false;
        this.servicioToast.create({
          header: 'Error al cargar productos',
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
