import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ProductosPageRoutingModule } from './productos-routing.module';
import { ProductosPage } from './productos.page';
import { FormularioProductosComponent } from './formulario-productos/formulario-productos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosPage, FormularioProductosComponent],
  providers: [
    ToastController,
    AlertController
  ]
})
export class ProductosPageModule {}
