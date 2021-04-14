import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { ArchivoAdjuntarComponent } from '../../modals/archivo-adjuntar/archivo-adjuntar.component';

import { Pco } from "../../models/pco.model";
import { ArchivoEtapa } from 'app/models/archivoEtapa.model';

import { PcoService } from "../../services/pco.service";
import { ArchivoService } from "../../services/archivo.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-mantenimiento-pco',
  templateUrl: './mantenimiento-pco.component.html',
  styles: [
  ],
  providers : [DatePipe]
})
export class MantenimientoPcoComponent implements OnInit {
  pco: Pco;
  forma: FormGroup;
  msjFechaFinInvalida: string;
  msjCantidadInvalido: string;
  elementFormValido: boolean;
  archivos_etapa: ArchivoEtapa[];

  constructor( private fb: FormBuilder,
    private _pcoService : PcoService,
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
                  this.pco.NombreExpediente = archivo.archivo_adjunto.name;
                } else {
                  this.pco.NombreSustento = archivo.archivo_adjunto.name;
                }
            }
        });
      }
    })
  }

  crearFormulario() {

    this.forma = this.fb.group({
      fechaInicio : [this.formatearFecha(this.pco.FechaInicio), [Validators.required]],
      fechaFin : [this.formatearFecha(this.pco.FechaFin), [Validators.required]],
      cantidad : [this.pco.Cantidad, [Validators.required, Validators.minLength(4)]],
      nombreExpediente : [this.pco.NombreExpediente, [Validators.required]],
      nombreSustento : [this.pco.NombreSustento, [Validators.required]]
    });

  }

  formatearFecha(fecha : Date) :string{
    if(fecha === null){
      return null;
    } else {
      return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }
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

  get cantidadNoValido() {
    this.elementFormValido = this.forma.get('cantidad').invalid && this.forma.get('cantidad').touched
    this.msjCantidadInvalido = "";

    if(!this.elementFormValido){
      var cantidad: number = this.forma.get('cantidad').value;
      if(cantidad === null){
        this.elementFormValido = false;
      } else if (cantidad <= 0){
        this.elementFormValido = true;
        this.msjCantidadInvalido = "La cantidad no puede ser menor o igual a 0";
      }
    } else {
      this.msjCantidadInvalido = "Ingrese la cantidad";
    }

    return this.elementFormValido;
  }

  get nombreExpedienteNoValido() {
    return this.forma.get('nombreExpediente').invalid && this.forma.get('nombreExpediente').touched
  }

  get nombreSustentoNoValido() {
    return this.forma.get('nombreSustento').invalid && this.forma.get('nombreSustento').touched
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

    this.pco.FechaInicio = this.forma.get("fechaInicio").value;
    this.pco.FechaFin = this.forma.get("fechaFin").value;
    this.pco.Cantidad = this.forma.get("cantidad").value;
    this.pco.NombreExpediente = this.forma.get("nombreExpediente").value;
    this.pco.NombreSustento = this.forma.get("nombreSustento").value;

    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    this._pcoService.insertarPco(this.pco).subscribe( resp => {
      this.pco = resp;
      this.pco.Estado = "V";

      console.log(this.pco);
      
      //Subiendo los archivos adjuntos
      for(let i = 0; i < this.archivos_etapa.length; i++) {
        let _token = (this.archivos_etapa[i].Subtipo === 'E') ? this.pco.IdExpediente : this.pco.IdSustento;

        console.log("_token:" + _token);

        this._archivoService.cargar_archivo(encodeURIComponent(this.pco.IdExpediente), this.archivos_etapa[i].archivo_adjunto).
          subscribe(
            resp => { console.log(resp); },
            (error: any) => { console.log(error); }
        );
      }

      Swal.close();
    }, (err) => {
      console.log(err);
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
      this.pco.NombreExpediente = "";
      this.forma.get('nombreExpediente').markAsTouched();
    }

    if(tipo_archivo === "S"){
      this.archivos_etapa[1].archivo_adjunto = null;
      this.pco.NombreSustento = "";
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
    let idToken: string = (tipo_archivo === 'E') ? this.pco.IdExpediente : this.pco.IdSustento;
    let nombreAdjunto: string = (tipo_archivo === 'E') ? "_adjunto_expediente" : "_adjunto_sustento";

    this._archivoService.descargar_adjunto( idToken ).
      subscribe(resp => {
      
        const blob_data = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([blob_data], { type: 'application/pdf' }); 
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = this.pco.Correlativo + nombreAdjunto + '.pdf';
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
