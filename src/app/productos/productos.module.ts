import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ProductosPageRoutingModule } from './productos-routing.module';
import { ProductosPage } from './productos.page';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosPage, FormularioProductoComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class ProductosPageModule {}
