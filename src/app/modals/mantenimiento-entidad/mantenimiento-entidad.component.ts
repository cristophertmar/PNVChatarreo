import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EntidadService } from "app/services/entidad.service";

import { Entidad } from "app/models/entidad.model";
import { EntidadRequest } from "app/models/entidadRequest.model";

import Swal from "sweetalert2";

export interface Tipos {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-mantenimiento-entidad',
  templateUrl: './mantenimiento-entidad.component.html',
  styleUrls: [
  ]
})
export class MantenimientoEntidadComponent implements OnInit {
  @ViewChild('btncerrarEntidad') btncerrarEntidad: ElementRef<HTMLElement>;

  form_entidad: FormGroup;
  entidad: Entidad;
  accion: string;

  tipos: Tipos[] = [
    {codigo: "H", descripcion: "PCH"},
    {codigo: "O", descripcion: "PCO"}
  ];

  constructor(
    private fb: FormBuilder,
    private _entidadService: EntidadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  
  crearFormulario() {
    this.form_entidad = this.fb.group({
      tipo : [this.entidad.Tipo, [Validators.required]],
      nombre : [this.entidad.Nombre, [Validators.required]]
    });
  }

  get tipoNoValido() {
    return this.form_entidad.get('tipo').invalid && this.form_entidad.get('tipo').touched
  }

  get nombreNoValido() {
    return this.form_entidad.get('nombre').invalid && this.form_entidad.get('nombre').touched
  }

  guardar(){
    if(this.form_entidad.invalid) {
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
    
    let eRequest: EntidadRequest = {}

    eRequest.IdEntidad = this.entidad.IdEntidad;
    eRequest.Tipo = this.form_entidad.value.tipo;
    eRequest.Nombre = this.form_entidad.value.nombre;
    eRequest.IdPadre = "";
    
    if(this.accion === 'N'){
      this._entidadService.insertarEntidad(eRequest).
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
      this._entidadService.modificarEntidad(eRequest).
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
    localStorage.setItem("cerrarEntidad","1");

    if (!exito){
      localStorage.setItem("cerrarEntidad","2");
    }

    this.btncerrarEntidad.nativeElement.click();
  }

}
