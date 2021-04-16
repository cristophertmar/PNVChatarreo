import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from "app/services/usuario.service";

import { UsuarioLogueado } from "app/models/usuarioLogueado.model";
import { UsuarioRequest } from 'app/models/usuarioRequest.model';

import { MantenimientoUsuarioComponent } from 'app/modals/mantenimiento-usuario/mantenimiento-usuario.component';

import Swal from "sweetalert2";

export interface Estados {
  codigo: string;
  descripcion: string;
}

export interface Tipos {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  form_busqueda: FormGroup;
  usuarios: UsuarioLogueado[];

  estados: Estados[] = [
    {codigo: "A", descripcion: "Asignado"},
    {codigo: "N", descripcion: "No Asignado"}
  ];

  tipos: Tipos[] = [
    {codigo: "H", descripcion: "PCH"},
    {codigo: "O", descripcion: "PCO"}
  ];

  constructor(
    private _usuarioService: UsuarioService,
    private _dialog: MatDialog
  ) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerUsuarios();
  }

  crearFormulario() {
    this.form_busqueda = new FormGroup({
      estado: new FormControl( 'A' ),
      tipo: new FormControl( 'H' )
    });
  }

  obtenerUsuarios(){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    
    let idEntidad: string = this.form_busqueda.value.entidad === null ? "1" : this.form_busqueda.value.entidad;

    this._usuarioService.getUsuarios(this.form_busqueda.value.tipo, this.form_busqueda.value.estado)
      .subscribe((data : any) => {
        this.usuarios = data;
        Swal.close();
      }
    );
  }

  editar(usu: UsuarioLogueado){
    const dialogRef = this._dialog.open(MantenimientoUsuarioComponent, {
      disableClose: true
    });
    
    usu.Tipo = this.form_busqueda.value.tipo;
    usu.Estado = this.form_busqueda.value.estado;
    
    dialogRef.componentInstance.usuario = usu;
    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarUsuario");
    });
  }

  eliminar(usu: UsuarioLogueado){
    usu.Tipo = this.form_busqueda.value.tipo;
    usu.Estado = this.form_busqueda.value.estado;

    Swal.fire({
      text: "¿Está sseguro de eliminar este registro?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let uRequest: UsuarioRequest = {}

        uRequest.Tipo = usu.Tipo;
        uRequest.IdUsuario = usu.IdUsuario;
        uRequest.IdEntidad = usu.IdEntidad;
        uRequest.Estado = 'N';

        this._usuarioService.modificarUsuario(uRequest)
          .subscribe((resp: any) => {
            this.obtenerUsuarios();
            Swal.close();
          }, 
          (error: any) => {
            Swal.fire({
              icon: 'error',
              text: 'No se pudo eliminar el usuario',
              showCancelButton: true
            });
      
            //console.log(error);
          });
      }
    })
  }

  validarAntesDeListar(strItem: string){
    let cerrar: string = localStorage.getItem(strItem);
      
      if(cerrar === "1"){
        this.obtenerUsuarios();
      }
      
      localStorage.removeItem(strItem);
  }

}
