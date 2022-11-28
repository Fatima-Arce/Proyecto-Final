import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Productos } from '../interfaces/productos.interface';
import { ProductosService } from '../servicios/productos.service';
import { FormularioProductosComponent } from './formulario-productos/formulario-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioProductosComponent) formularioProductos!: FormularioProductosComponent

  public listaProductos: Productos[] = [];
  public cargandoProductos: boolean = false;
  public modalVisible: boolean = false;

  private productoSeleccionado: Productos | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

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
    this.modoFormulario = 'Registrar';
    this.productoSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(productos: Productos){
    this.productoSeleccionado = productos;
    this.formularioProductos.modo = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar(){
    if(this.modoFormulario === 'Editar') {
      this.formularioProductos.modo = this.modoFormulario;
      this.formularioProductos.form.controls.idproductoCtrl.setValue(this.productoSeleccionado.idproducto);
      this.formularioProductos.form.controls.nombreProCtrl.setValue(this.productoSeleccionado.nombrePro);
      this.formularioProductos.form.controls.precioProCtrl.setValue(this.productoSeleccionado.precioPro);
      this.formularioProductos.form.controls.cantidadProCtrl.setValue(this.productoSeleccionado.cantidadPro);
      this.formularioProductos.form.controls.produOfertaCtrl.setValue(this.productoSeleccionado.produOferta);
      this.formularioProductos.form.controls.marcaProCtrl.setValue(this.productoSeleccionado.marcaPro);      
    }
  }
}
