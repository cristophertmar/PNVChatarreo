import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EntidadService } from "app/services/entidad.service";
import { UsuarioService } from "app/services/usuario.service";

import { UsuarioLogueado } from "app/models/usuarioLogueado.model";
import { UsuarioRequest } from 'app/models/usuarioRequest.model';
import { Entidad } from "app/models/entidad.model";

import Swal from "sweetalert2";

@Component({
  selector: 'app-mantenimiento-usuario',
  templateUrl: './mantenimiento-usuario.component.html',
  styles: [
  ]
})
export class MantenimientoUsuarioComponent implements OnInit {
  @ViewChild('btncerrarUsuario') btncerrarUsuario: ElementRef<HTMLElement>;

  usuario: UsuarioLogueado;
  entidades: Entidad[];
  form_usuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _entidadService: EntidadService,
    private _usuarioService: UsuarioService
  ) { 
    this.entidades = [];
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    
    let idEntidad = (!this.usuario.IdEntidad || this.usuario.IdEntidad === 0) ? '' : this.usuario.IdEntidad.toString();
    
    this.form_usuario = this.fb.group({
      entidad : [idEntidad, [Validators.required]]
    });
    
    this._entidadService.getEntidadesPorTipo(this.usuario.Tipo).
      subscribe((resp: any) => {
        this.entidades = resp;

        Swal.close();
      }, 
      (error: any) => {
        console.log(error);

        Swal.fire({
          icon: 'error',
          text: 'No se pudo traer las entidades',
          showCancelButton: true
        });
      });
  }

  get entidadNoValido() {
    return this.form_usuario.get('entidad').invalid && this.form_usuario.get('entidad').touched
  }

  guardar(){
    if(this.form_usuario.invalid) {
      Swal.fire({
        text: 'Debe elegir la Entidad',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      })

      return;
    }
    
    let uRequest: UsuarioRequest = {}

    uRequest.Tipo = this.usuario.Tipo;
    uRequest.IdUsuario = this.usuario.IdUsuario;
    uRequest.IdEntidad = this.form_usuario.value.entidad;
    uRequest.Estado = 'A';
    
    this._usuarioService.modificarUsuario(uRequest).
      subscribe((resp: any) => {
        //console.log(resp);
        this.cerrar_modal(true);
  
        Swal.close();
      }, 
      (error: any) => {
        Swal.fire({
          icon: 'error',
          text: 'No se asignar la Entidad al Usuario',
          showCancelButton: true
        });
  
        //console.log(error);
      });
  }

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarUsuario","1");

    if (!exito){
      localStorage.setItem("cerrarUsuario","2");
    }

    this.btncerrarUsuario.nativeElement.click();
  }

}
