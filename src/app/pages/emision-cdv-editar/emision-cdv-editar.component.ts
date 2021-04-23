import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { Proceso } from 'app/models/proceso.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitEtapaRequest } from '../../models/itEtapaRequest.model';
import { ProcesoEtapaService } from 'app/services/proceso-etapa.service';
import { FinEtapaRequest } from '../../models/fEtapaRequest.model';

import Swal from 'sweetalert2';
import { ArchivoService } from 'app/services/archivo.service';
import { IArchivoRequest } from 'app/models/iarchivoRequest.model';
import { PchService } from 'app/services/pch.service';

@Component({
  selector: 'app-emision-cdv-editar',
  templateUrl: './emision-cdv-editar.component.html',
  styles: [
  ]
})
export class EmisionCdvEditarComponent implements OnInit {
  form_etapa: FormGroup;
  token: string;
  proceso_obtenido: Proceso;
  ietapa: InitEtapaRequest;
  fetapa: FinEtapaRequest;
  iarchivo_request: IArchivoRequest;

  informe_cdv: File;

  fecha_maxima: string = '';

  pgm_chatarreo: string;

  @ViewChild('select_file_cdv') select_file_cdv: ElementRef;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _procesoService: ProcesoService,
    private _procesoEtapaService : ProcesoEtapaService,
    private _router: Router,
    private _pchService: PchService,
    private _archivoService: ArchivoService,
    public gallery: Gallery) {
      this.token = '';
      this.proceso_obtenido = {};
      this.ietapa = {};
      this.fetapa = {};
  }

  ngOnInit(): void {
    this.obtener_fecha_maxima();
    this.crear_formulario();

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      this.obtener_proceso_token(this.token);
    }); 
  }

  obtener_fecha_maxima() {
    const today = new Date();
    this.fecha_maxima = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }

  obtener_proceso_token(token: string) {
    this._procesoService.obtener_proceso_token(encodeURIComponent(token))
    .subscribe( (resp: Proceso) => {
      this.proceso_obtenido = resp;
      console.log(this.proceso_obtenido);
      this.setear_formulario(this.proceso_obtenido);
      this.deshabilitar_inputs();
    });
  }

  crear_formulario() {
    this.form_etapa = new FormGroup({

      // Datos de la solicitud
      nro_solicitud: new FormControl( null, [Validators.required]),
      fecha_solicitud: new FormControl( null, [Validators.required]),
      pgm_chatarreo: new FormControl( null, [Validators.required]),

      // Verificación Física
      fecha_inicio: new FormControl( null, [Validators.required]),
      hora_inicio: new FormControl( null, [Validators.required]),
      informe: new FormControl( null, [Validators.required]),
      observacion: new FormControl( null),

    });
  }

  setear_formulario(proceso: Proceso) {
    this.form_etapa.setValue({
      // Datos de la solicitud
      nro_solicitud: proceso.Correlativo,
      fecha_solicitud: this.convertir_fecha(proceso.FechaFin),
      pgm_chatarreo: proceso.Tipo,

      // Verificación Física
      fecha_inicio: '',
      hora_inicio: '',
      informe: null,
      observacion: '',
    });

    if(proceso.Tipo === 'p') {
      this._pchService.getSeleccionar(proceso.IdPch)
      .subscribe((resp: any) =>  {
          /* this.pgm_chatarreo = resp.TipoPCH; */
          this.pgm_chatarreo = resp.TipoPCH;
          console.log(resp.TipoPCH)
      })
    }
    
  }

  convertir_fecha(fecha_covertir: string) {
    let fechaFormato = fecha_covertir.split("T",2);
    let fecha = fechaFormato[0];
    let hora = fechaFormato[1];
    return fecha;
  }  

  deshabilitar_inputs() {
    this.form_etapa.controls['nro_solicitud'].disable();
    this.form_etapa.controls['fecha_solicitud'].disable();
    this.form_etapa.controls['pgm_chatarreo'].disable();
  }

  guardar_etapa(){   
    
    if(this.form_etapa.invalid) {
      Swal.fire({
        text: 'Debe de llenar correctamente el formulario',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      })
      return;
    } else if (!(this.select_file_cdv.nativeElement.value)) {
      Swal.fire({
        text: 'Debe adjuntar el informe cdv',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      })
      return;
    }
    

    // Request Object Iniciar Etapa
    this.ietapa.IdProceso = this.proceso_obtenido.IdProceso;
    this.ietapa.IdEtapa = this.proceso_obtenido.Etapa.IdEtapa;
    this.ietapa.FechaInicio = this.obtener_fecha_inicial();
    this.ietapa.Estado = 'A';

    // Request Object Finalizar Etapa
    this.fetapa.IdProceso = this.proceso_obtenido.IdProceso;
    this.fetapa.IdEtapa = this.proceso_obtenido.Etapa.IdEtapa;
    this.fetapa.FechaInicio = this.obtener_fecha_inicial();
    this.fetapa.FechaFin = this.obtenerFecha_actual();
    this.fetapa.Estado = 'T';
    this.fetapa.Checklist = [];
    
    this._procesoEtapaService.iniciar_etapa(this.ietapa).
    subscribe(resp_ietapa => {   
      
        console.log(resp_ietapa);

        this._archivoService.cargar_archivo(encodeURIComponent(this.proceso_obtenido.IdCdv), this.informe_cdv).
        subscribe( resp_carga => {

          console.log(resp_carga);
          
          this._procesoEtapaService.finalizar_etapa(this.fetapa).
          subscribe( resp_fetapa => {
            console.log(resp_fetapa);
            this.descargar_informe();
            Swal.fire({
              text: 'Emisión del CVD finalizada',
              width: 350,
              padding: 15,
              timer: 3000,
              allowOutsideClick: false,
              showConfirmButton: false,
              icon: 'success'
            }).then( result => {
              this.volverEtapa();
            });
            
          });
              
        },
        (error: any) => {
          console.log(error);
        }
        );       

    });
  }

  volverEtapa(){
    this._router.navigate(['/etapa/emision-cdv']);
  }

  obtener_fecha_inicial() {
    const fecha = this.form_etapa.value.fecha_inicio;
    const hora = this.form_etapa.value.hora_inicio;
    return fecha + 'T' + hora + ':00.015Z'
  }

  obtenerFecha_actual(){
    let hoy = new Date();
    let fechaInicioFormato = hoy.toISOString();
    return fechaInicioFormato;
  }

  obtener_tipo_di(id_tipo_di: string) {
    return id_tipo_di === '01' ? 'DNI' : 'Carnet extranjería';
  }

  descargar_informe() {

    let id_etapa = this.proceso_obtenido.Etapa.IdEtapa;
    let id_proceso = this.proceso_obtenido.IdProceso;
    let token =this.token;

    this._procesoEtapaService.descargar_informe(id_etapa, encodeURIComponent(token)).
    subscribe(resp => {
    
      const blob_data = new Blob([resp], { type: 'application/pdf' });
      const blob = new Blob([blob_data], { type: 'application/pdf' }); 
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.download = 'verificacion_fisica_nro_'+ id_proceso +'.pdf';
      anchor.href = url;
      anchor.click();
    },
    (error) => {
      console.error(error);
      Swal.fire({
        text: 'Error al descargar informe. Intente nuevamente.',
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

  descargar_cdv() {

    let id_proceso = this.proceso_obtenido.IdProceso;
    let token =this.token;
    
    this._procesoEtapaService.descargar_cdv(encodeURIComponent(token)).
    subscribe(resp => {
      const blob_data = new Blob([resp], { type: 'application/pdf' });
      const blob = new Blob([blob_data], { type: 'application/pdf' }); 
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.download = 'informe_cdv'+ id_proceso +'.pdf';
      anchor.href = url;
      anchor.click();
    },
    (error) => {
      console.error(error);
      Swal.fire({
        text: 'Error al descargar informe cdv. Intente nuevamente.',
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

  seleccionImagen(archivo: File) {

    console.log(archivo);

    if ( !archivo ) {
      this.informe_cdv = null;
      return;
    }

    if ( archivo.type.indexOf('application/pdf') < 0 ) {
      Swal.fire({
        text: 'No es un PDF',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      })
      this.select_file_cdv.nativeElement.value = null;
      this.informe_cdv = null;
      return;
    }

    this.informe_cdv = archivo;

  }

  generarInforme() {
    Swal.fire({
        width: 550,
        padding: 15,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Generar',
        confirmButtonColor: '#F44336',
        buttonsStyling: true,
        focusConfirm: false,
        text: '¿Desea generar el Informe Final de la solicitud N° 54321-2021-00004 de la empresa ABC SRL / Local 001 XXXXXXXXXXXX?'
      });
  }

}
