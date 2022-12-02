import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Productos } from 'src/app/interfaces/productos.interface';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.scss'],
})
export class FormularioProductosComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaProductos: Productos[] = [];

  public form: FormGroup = new FormGroup({
    idproductoCtrl: new FormControl<number>(null, Validators.required),
    nombreProCtrl: new FormControl<number>(null, Validators.required),
    precioProCtrl: new FormControl<number>(null, Validators.required),
    cantidadProCtrl: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
    produOfertaCtrl: new FormControl<string>(null, Validators.required),
    marcaProCtrl: new FormControl<string>(null, Validators.required)
  });

  constructor(
    private servicioProductos: ProductosService,
    private servicioToast: ToastController,
    private servicioPedido: PedidoService
  ) { }

  private cargarProductos() {
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
    const productos: Productos = {
      idproducto: this.form.controls.idproductoCtrl.value,
      nombrePro: this.form.controls.nombreProCtrl.value,
      precioPro: this.form.controls.precioCtrl.value,
      cantidadPro: this.form.controls.cantidadCtrl.value,
      produOferta: this.form.controls.produOfertaCtrl.value,
      marcaPro: this.form.controls.marcaProCtrl.value,
    }
    this.servicioProductos.post(productos).subscribe({
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
    const productos: Productos = {
      idproducto: this.form.controls.idproductoCtrl.value,
      nombrePro: this.form.controls.nombreProCtrl.value,
      precioPro: this.form.controls.precioCtrl.value,
      cantidadPro: this.form.controls.cantidadCtrl.value,
      produOferta: this.form.controls.produOfertaCtrl.value,
      marcaPro: this.form.controls.marcaProCtrl.value,
    }
    this.servicioProductos.put(productos).subscribe({
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






