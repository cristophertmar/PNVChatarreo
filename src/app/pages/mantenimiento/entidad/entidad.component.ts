import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EntidadService } from "app/services/entidad.service";

import { Entidad } from "app/models/entidad.model";

import { MantenimientoEntidadComponent } from 'app/modals/mantenimiento-entidad/mantenimiento-entidad.component';

import Swal from "sweetalert2";

export interface Tipos {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styles: [
  ]
})
  export class EntidadComponent implements OnInit {
    form_busqueda: FormGroup;
    entidades: Entidad[];
  
    tipos: Tipos[] = [
      {codigo: "H", descripcion: "PCH"},
      {codigo: "O", descripcion: "PCO"}
    ];
  
    constructor(
      private _entidadService: EntidadService,
      private _dialog: MatDialog
    ) {
      this.entidades = [];
    }
  
    ngOnInit(): void {
      this.crearFormulario();
      this.obtenerEntidades();
    }
  
    crearFormulario() {
      this.form_busqueda = new FormGroup({
        tipo: new FormControl( 'H' )
      });
    }
  
    obtenerEntidades(){
      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
  
      this._entidadService.getEntidadesPorTipo(this.form_busqueda.value.tipo)
        .subscribe((data : any) => {
          this.entidades = data;
          Swal.close();
        }
      );
    }
  
    nuevo(){
      let ent: Entidad = {};
  
      ent.IdEntidad = 0;
      ent.Tipo = this.form_busqueda.value.tipo;
      ent.Nombre = '';
  
      const dialogRef = this._dialog.open(MantenimientoEntidadComponent, {
        disableClose: true
      });
      
      dialogRef.componentInstance.entidad = ent;
      dialogRef.componentInstance.accion = 'N';
  
      dialogRef.afterClosed().subscribe(result => {
        this.validarAntesDeListar("cerrarEntidad");
      });
    }
  
    editar(ent: Entidad){
      const dialogRef = this._dialog.open(MantenimientoEntidadComponent, {
        disableClose: true
      });
      
      dialogRef.componentInstance.entidad = ent;
      dialogRef.componentInstance.accion = 'M';
  
      dialogRef.afterClosed().subscribe(result => {
        this.validarAntesDeListar("cerrarEntidad");
      });
    }
  
    validarAntesDeListar(strItem: string){
      let cerrar: string = localStorage.getItem(strItem);
        
        if(cerrar === "1"){
          this.obtenerEntidades();
        }
        
        localStorage.removeItem(strItem);
    }

  }
