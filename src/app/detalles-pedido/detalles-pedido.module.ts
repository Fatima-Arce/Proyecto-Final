import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { DetallesPedidoPageRoutingModule } from './detalles-pedido-routing.module';
import { DetallesPedidoPage } from './detalles-pedido.page';
import { FormularioDetallesPedidoComponent } from './formulario-detalles-pedido/formulario-detalles-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetallesPedidoPage, FormularioDetallesPedidoComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class DetallesPedidoPageModule {}
