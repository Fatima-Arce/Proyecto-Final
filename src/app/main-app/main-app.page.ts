import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.page.html',
  styleUrls: ['./main-app.page.scss'],
})
export class MainAppPage implements OnInit {

  dockItems: MenuItem[] = [
    {
      label: "Pedidos",
      icon: "assets/pedido.jpg",
      routerLink: ['pedido']
    },
    {
      label: "Productos",
      icon: "assets/produ.png",
      routerLink: ['productos']
    },
    {
      label: "Usuario",
      icon: "assets/usuario.jpeg",
      routerLink: ['usuario']
    },
    {
      label: "Detalles Pedido",
      icon: "assets/detalles.jpg",
      routerLink: ['detallesPedido']
    },
    {
      label: 'Cerrar Sesion',
      icon: "assets/cerrar.png",
      command: () => this.cerrarSesion()
    }
  ];

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  public cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}


