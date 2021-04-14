import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MantenimientoPchComponent } from '../../modals/mantenimiento-pch/mantenimiento-pch.component';
import { AprobarComponent } from '../../modals/aprobar/aprobar.component';
import { ObservarComponent } from '../../modals/observar/observar.component';
import { Pch } from "../../models/pch.model";
import { Entidad } from "../../models/entidad.model";

import { PchService } from "../../services/pch.service";
import { EntidadService } from "../../services/entidad.service";
import { ArchivoService } from "../../services/archivo.service";

import Swal from "sweetalert2";

export interface Estados {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-programa-chatarreo',
  templateUrl: './programa-chatarreo.component.html',
  styles: [
  ]
})

export class ProgramaChatarreoComponent implements OnInit {
  pchs : Pch[] = [];
  form_busqueda: FormGroup;
  entidades : Entidad[] = [];
  sinRegistros : boolean = true;
  
  edopch: Estados[] = [
      {codigo: "N", descripcion: "Nuevo"},
      {codigo: "A", descripcion: "Aprobado"},
      {codigo: "O", descripcion: "Observado"}
    ];

  constructor(public _dialog: MatDialog,
      private fb: FormBuilder,
      private _pchService : PchService,
      private _entidadService : EntidadService,
      private _archivoService : ArchivoService
  ) { 
    
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerPCH();
  }

  crearFormulario() {
    // Formulario de Búsqueda
    this.form_busqueda = new FormGroup({
      estado: new FormControl('N'),
      entidad: new FormControl( )
    });
    
    this.obtenerEntidades("E");
  }

  obtenerEntidades(tipo: string){
    this._entidadService.getEntidadesPorTipo(tipo)
      .subscribe((data : any) => {
        this.entidades = data;
        console.log(data);
      },
      (error) => {
      }
      );
  }

  obtenerPCH(){
    this.sinRegistros = true;

    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    //Swal.showLoading();
    
    let idEntidad: string = this.form_busqueda.value.entidad === null ? "1" : this.form_busqueda.value.entidad;

    this._pchService.getPCH(this.form_busqueda.value.estado, idEntidad)
          .subscribe((data : any) => {
            this.pchs = data;

            if(this.pchs.length > 0){
              this.sinRegistros = false;
            }

            Swal.close();
          });
  }

  limpiar(){
    this.form_busqueda.value.estado = "N";
    //this.obtenerPCH();
  }

  nuevoPch(){
    var pch = new Pch("autogenerado", "", "Renovación Vehicular", null, null, null, null, "N", 1);
    this.abrirModal_mantenimiento(pch);
  }

  modificarPch(paramPch: Pch) {
    paramPch.Estado = "V";
    this.abrirModal_mantenimiento(paramPch);
  }

  abrirModal_mantenimiento(paramPch: Pch) {
    const dialogRef = this._dialog.open(MantenimientoPchComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.pch = paramPch;
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPCH();
    });
  }

  abrirModal_aprobar(paramPch: Pch) {
    const dialogRef = this._dialog.open(AprobarComponent);

    dialogRef.componentInstance.pch = paramPch;
    dialogRef.componentInstance.tipo = "PCH";
    dialogRef.componentInstance.codigo = paramPch.CodigoPCH;

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPCH();
    });
  }

  abrirModal_rechazar(paramPch: Pch) {
    const dialogRef = this._dialog.open(ObservarComponent);

    dialogRef.componentInstance.pch = paramPch;
    dialogRef.componentInstance.tipo = "PCH";
    
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPCH();
    });
  }

  descargar_adjunto(paramPch: Pch, tipo: string){
    let idToken: string = (tipo === 'E') ? paramPch.IdExpediente : paramPch.IdSustento;
    let nombreAdjunto: string = (tipo === 'E') ? "_adjunto_expediente" : "_adjunto_sustento";

    this._archivoService.descargar_adjunto( idToken ).
      subscribe(resp => {
      
        const blob_data = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([blob_data], { type: 'application/pdf' }); 
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = paramPch.CodigoPCH + nombreAdjunto + '.pdf';
        anchor.href = url;
        anchor.click();
      },
      (error) => {
        console.error('ERROR', error);
        Swal.fire({
          text: 'Error al descargar adjunto. Intente nuevamente.',
          width: 350,
          padding: 15,
          timer: 2000,
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'error'
        });
      }
      
      );
  }

}
