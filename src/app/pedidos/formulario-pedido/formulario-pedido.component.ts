import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/interface/pedido.interface';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.scss'],
})
export class FormularioPedidoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaPedido: Pedido[] = [];

  public form: FormGroup = new FormGroup({
    idpedidoCtrl: new FormControl<number>(null, Validators.required),
    idusuarioCtrl: new FormControl<number>(null, Validators.required),
    fechaPedidoCtrl: new FormControl<number>(null, Validators.required),
    fechaEntregaCtrl: new FormControl<number>(null, Validators.required)
  });

  constructor(
    private servicioPedidos: PedidosService,
    private servivioToast: ToastController,
  ) { }

  private cargarPedido() {
    this.servicioPedidos.get().subscribe({
      next: (pedido) => {
        this.listaPedido = pedido;
      },
      error: (e) => {
        console.error('Error al cargar Pedido', e);
        this.servivioToast.create({
          header: 'Error al cargar Pedido',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarPedido();
  }

  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if(this.modo === 'Registrar') {
        this.registrar();
      }else{
        this.editar();
      }     
    }
  }

  private registrar() {
    const pedido: Pedido = {
      idpedido: this.form.controls.idpedidoCtrl.value,
      idusuario: this.form.controls.idusuarioCtrl.value,
      fechaPedido: this.form.controls.fechaPedidoCtrl.value,
      fechaEntrega: this.form.controls.fechaEntregaCtrl.value,
    }
    this.servicioPedidos.post(pedido).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servivioToast.create({
          header: 'Exito',
          message: 'Se registro el pedido',
          duration: 2000,
          color: 'success'
        }).then(t => t.present())
      },
      error: (e) => {
        console.error('Error al registrar pedido', e);
        this.servivioToast.create({
          header: 'Error al registrar pedido',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

  private editar() {
    const pedido: Pedido = {
      idpedido: this.form.controls.idpedidoCtrl.value,
      idusuario: this.form.controls.idusuarioCtrl.value,
      fechaPedido: this.form.controls.fechaPedidoCtrl.value,
      fechaEntrega: this.form.controls.fechaEntregaCtrl.value,
    }
    this.servicioPedidos.put(pedido).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servivioToast.create({
          header: 'Exito',
          message: 'Se editó correctamente el pedido',
          duration: 2000,
          color: 'success'
        }).then(t => t.present())
      },
      error: (e) => {
        console.error('Error al editar pedido', e);
        this.servivioToast.create({
          header: 'Error al editar pedido',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }
}