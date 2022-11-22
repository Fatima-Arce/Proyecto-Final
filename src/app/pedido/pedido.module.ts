import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule
  ],
  declarations: [PedidoPage, FormularioPedidoComponent],
  providers: [
    ToastController
  ]
})
export class PedidoPageModule {}
