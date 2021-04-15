import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { ArchivoAdjuntarComponent } from '../../modals/archivo-adjuntar/archivo-adjuntar.component';

import { Pch } from "../../models/pch.model";
import { ArchivoEtapa } from 'app/models/archivoEtapa.model';

import { PchService } from "../../services/pch.service";
import { ArchivoService } from "../../services/archivo.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-mantenimiento-pch',
  templateUrl: './mantenimiento-pch.component.html',
  styles: [
  ],
  providers : [DatePipe]
})

export class MantenimientoPchComponent implements OnInit {
  @ViewChild('btncerrarmodal') btncerrarmodal: ElementRef<HTMLElement>;

  pch: Pch;
  forma: FormGroup;
  msjFechaFinInvalida: string;
  msjCapacidadRealInvalido: string;
  msjCapacidadVehicularInvalido: string;
  elementFormValido: boolean;
  archivos_etapa: ArchivoEtapa[];

  constructor( private fb: FormBuilder,
               private _pchService : PchService,
               private _archivoService : ArchivoService,
               private datePipe: DatePipe,
               private dialog: MatDialog)
  {
    this.archivos_etapa = [new ArchivoEtapa(), new ArchivoEtapa()];
  }

  ngOnInit(): void {
    this.crearFormulario();

    this._archivoService.lista_archivos_enviar.subscribe({
      next: (resp: ArchivoEtapa[]) => {
        const ultimo_archivo_aprobado: ArchivoEtapa = resp[resp.length - 1];

        this.archivos_etapa.map( archivo => {
            if(archivo.Subtipo === ultimo_archivo_aprobado.Subtipo) {
                archivo.archivo_adjunto = ultimo_archivo_aprobado.archivo_adjunto;

                if(archivo.Subtipo === 'E'){
                  this.pch.NombreExpediente = archivo.archivo_adjunto.name;
                } else {
                  this.pch.NombreSustento = archivo.archivo_adjunto.name;
                }
            }
        });
      }
    })
  }

  get fechaInicioNoValido() {
    return this.forma.get('fechaInicio').invalid && this.forma.get('fechaInicio').touched
  }

  get fechaFinNoValido() {
    this.elementFormValido =  this.forma.get('fechaFin').invalid && this.forma.get('fechaFin').touched;
    this.msjFechaFinInvalida = "";
    
    if(!this.elementFormValido){
      var fechaIni: Date = this.forma.get('fechaInicio').value;
      var fechaFin: Date = this.forma.get('fechaFin').value;
      
      if(!(this.forma.get('fechaInicio').invalid && this.forma.get('fechaInicio').touched)){
        if(fechaFin < fechaIni){
          this.elementFormValido = true;
          this.msjFechaFinInvalida = "La fecha fin debe ser mayor a la fecha de inicio"
        }
      }
    } else {
      this.msjFechaFinInvalida = "Seleccione una fecha fin"
    }
    
    return this.elementFormValido;
  }

  get capacidadVehicularNoValido() {
    this.elementFormValido = this.forma.get('capacidadVehicular').invalid && this.forma.get('capacidadVehicular').touched
    this.msjCapacidadVehicularInvalido = "";

    if(!this.elementFormValido){
      var capacidad: number = this.forma.get('capacidadVehicular').value;
      if(capacidad === null){
        this.elementFormValido = false;
      } else if (capacidad <= 0){
        this.elementFormValido = true;
        this.msjCapacidadVehicularInvalido = "La Capacidad Vehicular no puede ser menor o igual a 0";
      }
    } else {
      this.msjCapacidadVehicularInvalido = "Ingrese la capacidad vehicular";
    }

    return this.elementFormValido;
  }

  get capacidadRealNoValido() {
    this.elementFormValido = this.forma.get('capacidadReal').invalid && this.forma.get('capacidadReal').touched
    this.msjCapacidadRealInvalido = "";

    if(!this.elementFormValido){
      var capacidadV: number = this.forma.get('capacidadVehicular').value;
      var capacidadR: number = this.forma.get('capacidadReal').value;
      if(capacidadR === null){
        this.elementFormValido = false;
      } else if (capacidadR <= 0){
        this.elementFormValido = true;
        this.msjCapacidadRealInvalido = "La Capacidad Real no puede ser menor o igual a 0";
      } else if (capacidadV > 0 && capacidadR > capacidadV) {
        this.elementFormValido = true;
        this.msjCapacidadRealInvalido = "La capacidad real no puede ser mayor a la capacidad del PCH";
      }
    } else {
      this.msjCapacidadRealInvalido = "Ingrese la capacidad real";
    }

    return this.elementFormValido;
  }

  get nombreExpedienteNoValido() {
    return this.forma.get('nombreExpediente').invalid && this.forma.get('nombreExpediente').touched
  }

  get nombreSustentoNoValido() {
    return this.forma.get('nombreSustento').invalid && this.forma.get('nombreSustento').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      tipoPch  : [this.pch.TipoPCH],
      fechaInicio : [this.formatearFecha(this.pch.FechaInicio), [Validators.required]],
      fechaFin : [this.formatearFecha(this.pch.FechaFin), [Validators.required]],
      capacidadVehicular : [this.pch.CapacidadVehicular, [Validators.required, Validators.minLength(4)]],
      capacidadReal : [this.pch.CapacidadReal, [Validators.required, Validators.minLength(4)]],
      nombreExpediente : [this.pch.NombreExpediente, [Validators.required]],
      nombreSustento : [this.pch.NombreSustento, [Validators.required]]
    });

  }

  formatearFecha(fecha : Date) :string{
    if(fecha === null){
      return null;
    } else {
      return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }
  }

  guardar(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.pch.TipoPCH = this.forma.get("tipoPch").value;
    this.pch.FechaInicio = this.forma.get("fechaInicio").value;
    this.pch.FechaFin = this.forma.get("fechaFin").value;
    this.pch.CapacidadVehicular = this.forma.get("capacidadVehicular").value;
    this.pch.CapacidadReal = this.forma.get("capacidadReal").value;
    this.pch.NombreExpediente = this.forma.get("nombreExpediente").value;
    this.pch.NombreSustento = this.forma.get("nombreSustento").value;

    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    this._pchService.insertarPch(this.pch).subscribe( resp => {
      this.pch = resp;
      this.pch.Estado = "V";

      console.log(this.pch);
      
      //Subiendo los archivos adjuntos
      for(let i = 0; i < this.archivos_etapa.length; i++) {
        let _token = (this.archivos_etapa[i].Subtipo === 'E') ? this.pch.IdExpediente : this.pch.IdSustento;

        console.log("_token:" + _token);

        this._archivoService.cargar_archivo(encodeURIComponent(_token), this.archivos_etapa[i].archivo_adjunto).
          subscribe(
            resp => { 
              if( i === (this.archivos_etapa.length - 1) ){
                Swal.close();
                this.cerrar_modal(true);
              }

              console.log(resp);
            },
            (error: any) => {
              if( i === (this.archivos_etapa.length - 1) ){
                Swal.close();
                this.cerrar_modal(false);;
              }

              console.log(error);
            }
        );
      }
    }, (err) => {
      Swal.fire({
        icon: 'error',
        text: 'Error al autenticar',
        showCancelButton: true
      });
    });
  }

  quitar_archivo(tipo_archivo: string){
    if(tipo_archivo === "E"){
      this.archivos_etapa[0].archivo_adjunto = null;
      this.pch.NombreExpediente = "";
      this.forma.get('nombreExpediente').markAsTouched();
    }

    if(tipo_archivo === "S"){
      this.archivos_etapa[1].archivo_adjunto = null;
      this.pch.NombreSustento = "";
      this.forma.get('nombreSustento').markAsTouched();
    }
  }

  adjuntar_archivo(tipo_archivo: string) {
    let archivo_evaluar: ArchivoEtapa;

    if(tipo_archivo === 'E'){
      archivo_evaluar = this.archivos_etapa[0];
      archivo_evaluar.Descripcion = "Adjuntar Expediente";
    } else {
      archivo_evaluar = this.archivos_etapa[1];
      archivo_evaluar.Descripcion = "Adjuntar Sustento";
    }
    
    archivo_evaluar.IdEtapa = 0;
    archivo_evaluar.Extension = ".pdf";
    //archivo_evaluar.Extension = ".pdf.docx";
    archivo_evaluar.Subtipo = tipo_archivo;
    archivo_evaluar.Obligatorio = "S";
    archivo_evaluar.Multiple = "N";
    archivo_evaluar.ValidaRepresentante = "N";

    this._archivoService.obtener_archivo_evaluar(archivo_evaluar);

    const dialogRefAdj = this.dialog.open(ArchivoAdjuntarComponent, {
        width: '700px'
    });
  }

  descargar_adjunto(tipo_archivo: string){
    let idToken: string = (tipo_archivo === 'E') ? this.pch.IdExpediente : this.pch.IdSustento;
    let nombreAdjunto: string = (tipo_archivo === 'E') ? "_adjunto_expediente" : "_adjunto_sustento";
    
    //idToken = 'coK6/0vlKtL5IaKcGoBNQvku4s+ekilT9rCSJL7SUvI=';

    this._archivoService.descargar_adjunto( encodeURIComponent(idToken) ).
      subscribe(resp => {
      
        const blob_data = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([blob_data], { type: 'application/pdf' }); 
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = this.pch.CodigoPCH + nombreAdjunto + '.pdf';
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

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarMantPCH","1");

    if (!exito){
      localStorage.setItem("cerrarMantPCH","2");
    }

    this.btncerrarmodal.nativeElement.click();
  }

}
