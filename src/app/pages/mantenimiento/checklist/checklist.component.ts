import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ChecklistService } from "app/services/checklist.service";

import { Checklist } from "app/models/checklist.model";
import { ChecklistRequestDel } from 'app/models/checklistRequestDel.model';

import { MantenimientoChecklistComponent } from 'app/modals/mantenimiento-checklist/mantenimiento-checklist.component';

import Swal from "sweetalert2";

export interface Etapas {
  idEtapa: number;
  descripcion: string;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styles: [
  ]
})
export class ChecklistComponent implements OnInit {
  form_busqueda: FormGroup;
  checklists: Checklist[];

  etapas: Etapas[] = [
    {idEtapa: 1, descripcion: "Evaluación Documentaria"},
    {idEtapa: 2, descripcion: "Verificación Física"},
    {idEtapa: 3, descripcion: "Eliminación de Fluidos"},
    {idEtapa: 4, descripcion: "Desguace Vehicular"},
    {idEtapa: 5, descripcion: "Compactación"},
    {idEtapa: 6, descripcion: "Emisión del CDV"}
  ];

  constructor(
    private _checklistService: ChecklistService,
    private _dialog: MatDialog
  ) { 
    this.checklists = [];
  }
  
  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerChecklists();
  }

  crearFormulario() {
    this.form_busqueda = new FormGroup({
      etapa: new FormControl( 1 )
    });
  }

  obtenerChecklists(){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    this._checklistService.getChecklist(this.form_busqueda.value.etapa)
      .subscribe((data : any) => {
        this.checklists = data;
        Swal.close();
      }
    );
  }

  nuevo(){
    let chk: Checklist = {};
  
    chk.IdEtapa = this.form_busqueda.value.etapa;
    chk.IdChecklist = 0;
    chk.Orden = 0;
    chk.Descripcion = '';
    chk.Estado = 'A';

    const dialogRef = this._dialog.open(MantenimientoChecklistComponent, {
      disableClose: true
    });
    
    dialogRef.componentInstance.checklist = chk;
    dialogRef.componentInstance.accion = 'N';

    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarChecklist");
    });
  }

  editar(chk: Checklist){
    const dialogRef = this._dialog.open(MantenimientoChecklistComponent, {
      disableClose: true
    });
    
    dialogRef.componentInstance.checklist = chk;
    dialogRef.componentInstance.accion = 'M';

    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarChecklist");
    });
  }

  eliminar(chk: Checklist){
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
        let chkDel: ChecklistRequestDel = {}

        chkDel.IdEtapa = chk.IdEtapa;
        chkDel.IdChecklist = chk.IdChecklist;
        chkDel.Estado = 'I';

        this._checklistService.eliminarCheklist(chkDel)
          .subscribe((resp: any) => {
            this.obtenerChecklists();
            Swal.close();
          }, 
          (error: any) => {
            Swal.fire({
              icon: 'error',
              text: 'No se pudo eliminar el Checklist',
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
        this.obtenerChecklists();
      }
      
      localStorage.removeItem(strItem);
  }

}
