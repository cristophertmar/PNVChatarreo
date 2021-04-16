import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ChecklistService } from "app/services/checklist.service";

import { Checklist } from "app/models/checklist.model";
import { ChecklistRequestUpd } from "app/models/checklistRequestUpd.model";

import Swal from "sweetalert2";

export interface Etapas {
  idEtapa: number;
  descripcion: string;
}

@Component({
  selector: 'app-mantenimiento-checklist',
  templateUrl: './mantenimiento-checklist.component.html',
  styleUrls: [
  ]
})
export class MantenimientoChecklistComponent implements OnInit {
  @ViewChild('btncerrarChecklist') btncerrarChecklist: ElementRef<HTMLElement>;

  form_checklist: FormGroup;
  checklist: Checklist;
  accion: string;

  etapas: Etapas[] = [
    {idEtapa: 1, descripcion: "Evaluación Documentaria"},
    {idEtapa: 2, descripcion: "Verificación Física"},
    {idEtapa: 3, descripcion: "Eliminación de Fluidos"},
    {idEtapa: 4, descripcion: "Desguace Vehicular"},
    {idEtapa: 5, descripcion: "Compactación"},
    {idEtapa: 6, descripcion: "Emisión del CDV"}
  ];

  constructor(
    private fb: FormBuilder,
    private _checklistService: ChecklistService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  
  crearFormulario() {
    this.form_checklist = this.fb.group({
      etapa : [this.checklist.IdEtapa, [Validators.required]],
      descripcion : [this.checklist.Descripcion, [Validators.required]]
    });
  }

  get etapaNoValido() {
    return this.form_checklist.get('etapa').invalid && this.form_checklist.get('etapa').touched
  }

  get descripcionNoValido() {
    return this.form_checklist.get('descripcion').invalid && this.form_checklist.get('descripcion').touched
  }

  guardar(){
    if(this.form_checklist.invalid) {
      Swal.fire({
        text: 'Complete todos los datos del formulario',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      })

      return;
    }
    
    if(this.accion === 'N'){
      this.checklist.IdEtapa = this.form_checklist.value.etapa;
      this.checklist.Descripcion = this.form_checklist.value.descripcion;

      this._checklistService.insertarChecklist(this.checklist).
        subscribe((resp: any) => {
          //console.log(resp);
          this.cerrar_modal(true);
    
          Swal.close();
        }, 
        (error: any) => {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo registrar la entidad',
            showCancelButton: true
          });
    
          //console.log(error);
        });
    } else {
      let cUpdRequest: ChecklistRequestUpd = {}
  
      cUpdRequest.IdEtapa = this.form_checklist.value.etapa;
      cUpdRequest.IdChecklist = this.checklist.IdChecklist;
      cUpdRequest.Descripcion = this.form_checklist.value.descripcion;
      cUpdRequest.Estado = 'A';

      this._checklistService.modificarCheklist(cUpdRequest).
      subscribe((resp: any) => {
        //console.log(resp);
        this.cerrar_modal(true);
  
        Swal.close();
      }, 
      (error: any) => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo modificar la entidad',
          showCancelButton: true
        });
  
        //console.log(error);
      });
    }
    
  }

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarChecklist","1");

    if (!exito){
      localStorage.setItem("cerrarChecklist","2");
    }

    this.btncerrarChecklist.nativeElement.click();
  }

}
