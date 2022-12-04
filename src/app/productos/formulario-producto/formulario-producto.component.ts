import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/interface/producto.interface';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss'],
})
export class FormularioProductoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaProductos: Producto[] = [];

  public form: FormGroup = new FormGroup({
    idproductoCtrl: new FormControl<number>(null, Validators.required),
    nombreProCtrl: new FormControl<string>(null, Validators.required),
    precioProCtrl: new FormControl<number>(null, Validators.required),
    cantidadProCtrl: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
    produOfertaCtrl: new FormControl<string>(null, Validators.required),
    marcaProCtrl: new FormControl<string>(null, Validators.required)
  });

  constructor(
    private servicioProductos: ProductosService,
    private servicioToast: ToastController,
    private servicioPedidos: PedidosService
  ) { }

  private cargarProductos(){
    this.servicioProductos.get().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (e) => {
        console.error('Error al cargar Productos', e);
        this.servicioToast.create({
          header: 'Error al cargar Productos',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.modo === 'Registrar') {
        this.registrar();
      } else {
        this.editar();
      }
    }
  }
  private registrar() {
    const producto: Producto = {
      idproducto: this.form.controls.idproductoCtrl.value,
      nombrePro: this.form.controls.nombreProCtrl.value,
      precioPro: this.form.controls.precioProCtrl.value,
      cantidadPro: this.form.controls.cantidadProCtrl.value,
      produOferta: this.form.controls.produOfertaCtrl.value,
      marcaPro: this.form.controls.marcaProCtrl.value,
      
    }
    this.servicioProductos.post(producto).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Exito',
          message: 'Se registro el producto',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar producto', e);
        this.servicioToast.create({
          header: 'Error al registrar producto',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }

  private editar() {
    const producto: Producto = {
      idproducto: this.form.controls.idproductoCtrl.value,
      nombrePro: this.form.controls.nombreProCtrl.value,
      precioPro: this.form.controls.precioProCtrl.value,
      cantidadPro: this.form.controls.cantidadProCtrl.value,
      produOferta: this.form.controls.produOfertaCtrl.value,
      marcaPro: this.form.controls.marcaProCtrl.value,
    }
    this.servicioProductos.put(producto).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Exito',
          message: 'Se editó el producto',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al editar producto', e);
        this.servicioToast.create({
          header: 'Error al editar producto',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }

  public incrementarCantidad() {
    if (this.form.controls.cantidadProCtrl.value != null) {
      const cantActual: number = this.form.controls.cantidadProCtrl.value;
      this.form.controls.cantidadProCtrl.setValue(cantActual+1);
    } else {
      this.form.controls.cantidadProCtrl.setValue(0);
    }
  }

  public disminuirCantidad() {
    if (this.form.controls.cantidadProCtrl.value != null) {
      const cantActual: number = this.form.controls.cantidadProCtrl.value;
      if(cantActual > 0) {
        this.form.controls.cantidadProCtrl.setValue(cantActual-1);
      }
    } else {
      this.form.controls.cantidadProCtrl.setValue(-1);
    }
  }
}






