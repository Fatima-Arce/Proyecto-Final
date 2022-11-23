import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';

import { DetallesPedidoPageRoutingModule } from './detalles-pedido-routing.module';

import { DetallesPedidoPage } from './detalles-pedido.page';
import { FormularioDetallesPedidoComponent } from './formulario-detalles-pedido/formulario-detalles-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidoPageRoutingModule
  ],
  declarations: [DetallesPedidoPage, FormularioDetallesPedidoComponent],
  providers: [
    ToastController
  ]
})
export class DetallesPedidoPageModule {}