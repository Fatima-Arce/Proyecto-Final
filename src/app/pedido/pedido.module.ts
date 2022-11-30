import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { PedidoPageRoutingModule } from './pedido-routing.module';
import { PedidoPage } from './pedido.page';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoPage, FormularioPedidoComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class PedidoPageModule {}
