import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CargarNumerosComponent } from '../../modals/cargar-numeros/cargar-numeros.component';
import { MantenimientoPcoComponent } from '../../modals/mantenimiento-pco/mantenimiento-pco.component';
import { AprobarComponent } from '../../modals/aprobar/aprobar.component';
import { ObservarComponent } from '../../modals/observar/observar.component';
import { Pco } from "../../models/pco.model";
import { Entidad } from "../../models/entidad.model";

import { PcoService } from "../../services/pco.service";
import { EntidadService } from "../../services/entidad.service";
import { ArchivoService } from "../../services/archivo.service";

import Swal from "sweetalert2";
import { UsuarioService } from 'app/services/usuario.service';

export interface Estados {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-chatarreo-obligatorio',
  templateUrl: './chatarreo-obligatorio.component.html',
  styles: [
  ]
})
export class ChatarreoObligatorioComponent implements OnInit {
  
  pcos : Pco[] = [];
  form_busqueda: FormGroup;
  entidades : Entidad[] = [];
  
  edopco: Estados[] = [
      {codigo: "N", descripcion: "Nuevo"},
      {codigo: "A", descripcion: "Aprobado"},
      {codigo: "O", descripcion: "Observado"}
    ];

    constructor(
      public _dialog          : MatDialog,
      private fb              : FormBuilder,
      private _pcoService     : PcoService,
      private _entidadService : EntidadService,
      private _archivoService : ArchivoService,
      public _usuarioService  : UsuarioService
  ) { 
    
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    // Formulario de Búsqueda
    this.form_busqueda = new FormGroup({
      estado: new FormControl('N'),
      entidad: new FormControl( )
    });
    
    this.obtenerEntidades("O");
  }

  obtenerEntidades(tipo: string){
    if(this._usuarioService.esaprobador()){
      this._entidadService.getEntidadesPorTipo(tipo)
      .subscribe((data : any) => {
        this.entidades = data;
        if(this.entidades && this.entidades.length > 0){
          this.form_busqueda.get("entidad").setValue(this.entidades[0].IdEntidad);
        }

        //console.log(data);
        this.obtenerPCO();
      },
      (error) => {
      }
      );
    } else {
      this.obtenerPCO();
    }
  }

  obtenerPCO(){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    let idEntidad: string = "0";
    if(this._usuarioService.esaprobador()){
      idEntidad = (this.entidades && this.entidades.length > 0) ? this.entidades[0].IdEntidad.toString() : "0";
    }
    
    this._pcoService.getPCO(idEntidad)
      .subscribe((data : any) => {
        this.pcos = data;
        //console.log(this.pcos);

        Swal.close();
      });
  }

  limpiar(){
    this.form_busqueda.value.estado = "N";
    this.obtenerPCO();
  }

  abrirModal_carga() {
    const dialogRef = this._dialog.open(CargarNumerosComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarCN");
    });
  }

  abrirModal_mantenimiento(paramPco: Pco) {
    paramPco.Estado = "V";

    const dialogRef = this._dialog.open(MantenimientoPcoComponent, {
      disableClose: true
    });
    
    dialogRef.componentInstance.pco = paramPco;
    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarMantPCO");
    });
  }

  abrirModal_aprobar(paramPco: Pco) {
    const dialogRef = this._dialog.open(AprobarComponent);

    dialogRef.componentInstance.pco = paramPco;
    dialogRef.componentInstance.tipo = "PCO";
    dialogRef.componentInstance.codigo = paramPco.Correlativo;

    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarAprobar");
    });
  }

  abrirModal_rechazar(paramPco: Pco) {
    const dialogRef = this._dialog.open(ObservarComponent);

    dialogRef.componentInstance.pco = paramPco;
    dialogRef.componentInstance.tipo = "PCO";

    dialogRef.afterClosed().subscribe(result => {
      this.validarAntesDeListar("cerrarRechazar");
    });
  }

  validarAntesDeListar(strItem: string){
    let cerrar: string = localStorage.getItem(strItem);
      
      if(cerrar === "1"){
        this.obtenerPCO();
      }
      
      localStorage.removeItem(strItem);
  }

  descargar_adjunto(paramPco: Pco, tipo: string){
    let idToken: string = (tipo === 'E') ? paramPco.IdExpediente : paramPco.IdSustento;
    let nombreAdjunto: string = (tipo === 'E') ? "_adjunto_expediente" : "_adjunto_sustento";

    this._archivoService.descargar_adjunto( idToken ).
      subscribe(resp => {
      
        const blob_data = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([blob_data], { type: 'application/pdf' }); 
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = paramPco.Correlativo + nombreAdjunto + '.pdf';
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
