import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;  
  formulario: FormGroup;
  usuario: Usuario;

  constructor(
    private _usuarioService: UsuarioService
  ) {  
    this.usuario = {};
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = new FormGroup({
        nom_usuario: new FormControl(null, [Validators.required]),
        contrasena_usuario: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ingresar(){
    
    if(this.formulario.invalid){
      return;
    }

    this.usuario.Usuario = this.formulario.value.nom_usuario;
    this.usuario.Contrasenia = this.formulario.value.contrasena_usuario;

    this._usuarioService.login(this.usuario).
    subscribe( resp => {
        console.log(resp);
    });

    

  }
  


}
  