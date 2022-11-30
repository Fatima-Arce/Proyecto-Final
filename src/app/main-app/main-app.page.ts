import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.page.html',
  styleUrls: ['./main-app.page.scss'],
})
export class MainAppPage implements OnInit {

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
