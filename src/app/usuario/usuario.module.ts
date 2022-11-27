import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UsuarioPageRoutingModule } from './usuario-routing.module';
import { UsuarioPage } from './usuario.page';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioPage, FormularioUsuarioComponent],
  providers: [
    ToastController
  ]
})
export class UsuarioPageModule {}
