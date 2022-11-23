import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DetallesPedido } from 'src/app/interfaces/detalles-pedido.interface';
import { DetallesPedidoService } from 'src/app/servicios/detalles-pedido.service';

@Component({
  selector: 'app-formulario-detalles-pedido',
  templateUrl: './formulario-detalles-pedido.component.html',
  styleUrls: ['./formulario-detalles-pedido.component.scss'],
})
export class FormularioDetallesPedidoComponent implements OnInit {

  public listaDetallesPedido: DetallesPedido[] = [];

  public iddetalles_pedido: number | null = null;
  public idproducto: number | null = null;
  public cantidad: number | null = null;
  public precio: number | null = null;

  public iddetalles_pedidoValidado: boolean = true;
  public idproductoValidado: boolean = true;
  public cantidadValidado: boolean = true;
  public precioValidado: boolean = true;

  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
    private servivioToast: ToastController
  ) { }

  private cargarDetallesPedido() {
    this.servicioDetallesPedido.get().subscribe({
      next: (detallespedido) => {
        this.listaDetallesPedido = detallespedido;
      },
      error: (e) => {
        console.error('Error al cargar Detalles Pedido', e);
        this.servivioToast.create({
          header: 'Error al cargar Detalles Pedido',
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
   this.validar();
  }

  private validar(): boolean{
    this.iddetalles_pedidoValidado = this.iddetalles_pedido !== null;
    this.idproductoValidado = this.idproducto !== null;
    this.cantidadValidado = this.cantidad !== null && this.cantidad > 0;
    this.precioValidado = this.precio !== null && this.cantidad > 0;
    return this.iddetalles_pedidoValidado && this.idproductoValidado && this.cantidadValidado && this.precioValidado

  }
}
