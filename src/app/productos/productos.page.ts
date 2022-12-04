import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Producto } from '../interface/producto.interface';
import { ProductosService } from '../servicios/productos.service'; 
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioProductoComponent) formularioProducto!: FormularioProductoComponent;

  public listaProductos: Producto[] = [];
  public cargandoProductos: boolean = false;
  public modalVisible: boolean = false;

  private productoSeleccionado: Producto | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioProductos: ProductosService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  public cargarProductos(){
    this.refresher?.complete();
    this.cargandoProductos = true;
    this.servicioProductos.get().subscribe({
      next: (productos) =>{
        this.listaProductos = productos;
        this.cargandoProductos = false;
      },
      error: (e) => {
        console.error("Error al consultar Productos", e);
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

  public editar(producto: Producto){
    this.productoSeleccionado = producto;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar(){
    if(this.modoFormulario === 'Editar') {
      this.formularioProducto.modo = this.modoFormulario;
      this.formularioProducto.form.controls.idproductoCtrl.setValue(this.productoSeleccionado.idproducto);
      this.formularioProducto.form.controls.nombreProCtrl.setValue(this.productoSeleccionado.nombrePro);
      this.formularioProducto.form.controls.precioProCtrl.setValue(this.productoSeleccionado.precioPro);
      this.formularioProducto.form.controls.cantidadProCtrl.setValue(this.productoSeleccionado.cantidadPro);
      this.formularioProducto.form.controls.produOfertaCtrl.setValue(this.productoSeleccionado.produOferta);
      this.formularioProducto.form.controls.marcaProCtrl.setValue(this.productoSeleccionado.marcaPro);      
    }
  }

  public confirmarEliminacion(producto: Producto) {
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el producto?',
      message: `${producto.idproducto} - ${producto.nombrePro} - ${producto.precioPro} - ${producto.cantidadPro} - ${producto.produOferta} (${producto.marcaPro})`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(producto)                 
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(producto: Producto) {
    this.servicioProductos.delete(producto).subscribe({
      next: () => {
        this.cargarProductos();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El producto se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar producto', e);
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
