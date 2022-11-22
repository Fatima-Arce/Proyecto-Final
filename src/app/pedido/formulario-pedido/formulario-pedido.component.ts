import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.scss'],
})
export class FormularioPedidoComponent implements OnInit {

  public listaPedido: Pedido[] = [];

  public idpedido: number | null = null;
  public idusuario: number | null = null;
  public fechaPedido: number | null = null;
  public fechaEntrega: number | null = null;

  constructor(
    private servicioPedido: PedidoService,
    private servivioToast: ToastController
  ) { }

  private cargarPedido(){
    this.servicioPedido.get().subscribe({
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

}
