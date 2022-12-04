import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DetallesPedido } from 'src/app/interface/detalles-pedido.interface';
import { DetallesPedidoService } from 'src/app/servicios/detalles-pedido.service';
import { PedidoService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-formulario-detalles-pedido',
  templateUrl: './formulario-detalles-pedido.component.html',
  styleUrls: ['./formulario-detalles-pedido.component.scss'],
})
export class FormularioDetallesPedidoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaDetallesPedido: DetallesPedido[] = [];

  public form: FormGroup = new FormGroup({
    iddetallesPedidoCtrl: new FormControl<number>(null, Validators.required),
    idproductoCtrl: new FormControl<number>(null, Validators.required),
    cantidadCtrl: new FormControl<number>(null, Validators.required),
    precioCtrl: new FormControl<number>(null, Validators.required),
    idpedidoCtrl: new FormControl<number>(null, Validators.required)
  });

  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
    private servivioToast: ToastController,
    private servicioPedido: PedidoService
  ) { }

  private cargarDetallesPedido() {
    this.servicioDetallesPedido.get().subscribe({
      next: (detallesPedido) => {
        this.listaDetallesPedido = detallesPedido;
      },
      error: (e) => {
        console.error('Error al cargar DetallesPedido', e);
        this.servivioToast.create({
          header: 'Error al cargar DetallesPedido',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarDetallesPedido();
  }

  guardar() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.modo === 'Registrar') {
        this.registrar();
      }else{
        this.editar();
      }     
    }
  }

  private registrar() {
    const detallesPedido: DetallesPedido = {
      iddetallesPedido: this.form.controls.iddetallesPedidoCtrl.value,
      idproducto: this.form.controls.idproductoCtrl.value,
      cantidad: this.form.controls.cantidadCtrl.value,
      precio: this.form.controls.precioCtrl.value,
      idpedido: this.form.controls.idpedidoCtrl.value,
    }
    this.servicioDetallesPedido.post(detallesPedido).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servivioToast.create({
          header: 'Exito',
          message: 'Se registro el detalle pedido',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar detalle pedido', e);
        this.servivioToast.create({
          header: 'Error al registrar detalle pedido',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

  private editar() {
    const detallesPedido: DetallesPedido = {
      iddetallesPedido: this.form.controls.iddetallesPedidoCtrl.value,
      idproducto: this.form.controls.idproductoCtrl.value,
      cantidad: this.form.controls.cantidadCtrl.value,
      precio: this.form.controls.precioCtrl.value,
      idpedido: this.form.controls.idpedidoCtrl.value,
    }
    this.servicioDetallesPedido.put(detallesPedido).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servivioToast.create({
          header: 'Exito',
          message: 'Se editó el detalle pedido',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al editar detalle pedido', e);
        this.servivioToast.create({
          header: 'Error al editar detalle pedido',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

}
