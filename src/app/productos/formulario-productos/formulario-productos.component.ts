import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Productos } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.scss'],
})
export class FormularioProductosComponent implements OnInit {

  public listaProductos: Productos[] = [];

  public idproducto: number | null = null;
  public nombrePro: string | null = null;
  public precioPro: number | null = null;
  public cantidadPro: number | null = null;
  public produOferta: string | null = null;
  public marcaPro: string | null = null;

  public idproductoValidado: boolean = true;
  public nombreProValidado: boolean = true;
  public precioProValidado: boolean = true;
  public cantidadProValidado: boolean = true;
  public produOfertaValidado: boolean = true;
  public marcaProValidado: boolean = true;

  constructor(
    private servicioProductos: ProductosService,
    private servicioToast: ToastController
  ) { }

  private cargarProductos() {
    this.servicioProductos.get().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (e) => {
        console.error('Error al cargar Productos', e);
        this.servicioToast.create({
          header: 'Error al cargar Productos',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  guardar() {
    this.validar();
  }

  private validar(): boolean {
    this.idproductoValidado = this.idproducto !== null;
    this.nombreProValidado = this.nombrePro !== null;
    this.precioProValidado = this.precioPro !== null;
    this.cantidadProValidado = this.cantidadPro !== null;
    this.produOfertaValidado = this.produOferta !== null;
    this.marcaProValidado = this.marcaPro !== null;
    return this.idproductoValidado && this.nombreProValidado && this.precioProValidado && this.cantidadProValidado && this.produOfertaValidado && this.marcaProValidado
  }

  public incrementarCantidad(){
    if(this.cantidadPro != null){
      this.cantidadPro ++;
    }else{
      this.cantidadPro = 0;
    }
  }

  public disminuirCantidad(){
    if(this.cantidadPro != null){    
      if(this.cantidadPro > 0){
        this.cantidadPro --;
      }
    }else{
      this.cantidadPro = -1
    }
  }

}
