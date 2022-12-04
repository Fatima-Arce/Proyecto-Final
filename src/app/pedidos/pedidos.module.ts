import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { PedidosPageRoutingModule } from './pedidos-routing.module';
import { PedidosPage } from './pedidos.page';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosPage, FormularioPedidoComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class PedidosPageModule {}
