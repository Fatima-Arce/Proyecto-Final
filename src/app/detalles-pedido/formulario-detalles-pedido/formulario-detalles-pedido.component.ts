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

  public iddetallesPedido: number | null = null;
  public idproducto: number | null = null;
  public cantidad: number | null = null;
  public precio: number | null = null;

  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
    private servivioToast: ToastController
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

}
