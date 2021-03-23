import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  form: FormGroup;
  correo: string;
  contrasena: string;
  recuerdame: boolean;

  constructor(private _router: Router) { 
    this.recuerdame = false;
  }

  ngOnInit(): void {
    this.crearForm();
    /* this.correo = localStorage.getItem( 'correo_remember' ) || '';
    this.contrasena = localStorage.getItem( 'contrasena_remember' ) || ''; */
    /* this.recuerdame = this.correo.length > 1 ? true : false; */
    /* this.setForm(); */
  }

  crearForm() {
    this.form = new FormGroup({
      nombre_usuario: new FormControl( null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      contrasena: new FormControl( null, [Validators.required, Validators.minLength(6)] ),
      recuerdame: new FormControl( false ),
    });
  }

 /*  setForm() {
    this.form.setValue ({
      correo: this.correo,
      password: this.contrasena,
      recuerdame: this.recuerdame
    });
  } */

  // Validaciones

  get correoNoValido() {
    return this.form.get('nombre_usuario').invalid && this.form.get('nombre_usuario').touched;  
  }

  get passNoValido() {
    return this.form.get('contrasena').invalid && this.form.get('contrasena').touched;
  }


  Ingresar() {

    if ( this.form.invalid ) {
      return Object.values( this.form.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    /* console.log(this.form.value); */
    this._router.navigate(['/']);
    


  }


}
