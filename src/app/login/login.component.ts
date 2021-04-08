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

  nom_usuario: string;
  contrasena: string;
  recuerdame: boolean;

  constructor(
    private _usuarioService: UsuarioService
  ) {  
    this.usuario = new Usuario();
    this.recuerdame = false;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.nom_usuario = localStorage.getItem('nomusuario_recuerda') || '';
    this.contrasena = localStorage.getItem('contrasena_recuerda') || '';
    this.recuerdame = this.nom_usuario.length > 1 ? true : false;
    this.setear_formulario();
  }

  crearFormulario(){
    this.formulario = new FormGroup({
        nom_usuario: new FormControl(null, [Validators.required]),
        contrasena_usuario: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        recuerdame: new FormControl(false),
    });
  }

  setear_formulario() {
    this.formulario.setValue ({
      nom_usuario: this.nom_usuario,
      contrasena_usuario: this.contrasena,
      recuerdame: this.recuerdame
    });
  }

  ingresar(){
    
    if(this.formulario.invalid){
      return;
    }

    this.usuario.Usuario = this.formulario.value.nom_usuario;
    this.usuario.Contrasenia = this.formulario.value.contrasena_usuario;
    const recuerdame = this.formulario.value.recuerdame;

    this._usuarioService.login(this.usuario, recuerdame).
    subscribe( resp => {
        console.log(resp);
    });

    

  }
  


}
  