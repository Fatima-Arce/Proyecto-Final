import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup = new FormGroup({
    ciCtrl: new FormControl<number>(null, [Validators.required]),
    passwordCtrl: new FormControl<string>(null, [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  iniciarSesion(){
    
  }

}
