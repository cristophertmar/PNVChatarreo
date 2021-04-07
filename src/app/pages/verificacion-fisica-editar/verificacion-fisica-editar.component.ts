import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { Proceso } from 'app/models/proceso.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Checklist } from '../../models/checklist.model';
import { InitEtapaRequest } from '../../models/itEtapaRequest.model';
import { ProcesoEtapaService } from 'app/services/proceso-etapa.service';
import { FinEtapaRequest } from '../../models/fEtapaRequest.model';

@Component({
  selector: 'app-verificacion-fisica-editar',
  templateUrl: './verificacion-fisica-editar.component.html',
  styles: [
  ]
})

export class VerificacionFisicaEditarComponent implements OnInit {

  form_etapa: FormGroup;
  token: string;
  proceso_obtenido: Proceso;
  checklist: Checklist[];
  checklist_request: Checklist[];
  ietapa: InitEtapaRequest;
  fetapa: FinEtapaRequest;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _procesoService: ProcesoService,
    private _procesoEtapaService : ProcesoEtapaService,
    private _router: Router
  ) { 
    this.token = '';
    this.proceso_obtenido = {};
    this.checklist = [];
    this.checklist_request = [];
    this.ietapa = {};
    this.fetapa = {};
  }

  ngOnInit(): void {
    this.crear_formulario();
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      this.obtener_proceso_token(this.token);
    }); 
    this.checklist_request = [];
    console.log(this.checklist_request);
   
  }

  obtener_proceso_token(token: string) {
    this._procesoService.obtener_proceso_token(encodeURIComponent(token))
    .subscribe( (resp: Proceso) => {
      this.proceso_obtenido = resp;
      /* console.log(this.proceso_obtenido); */
      this.checklist = this.proceso_obtenido.ProcesoEtapa.Checklist;
      this.setear_formulario(this.proceso_obtenido);
      this.deshabilitar_inputs();
    });
  }

  guardar_etapa() {

    console.log(this.checklist_request.length);
    console.log(this.checklist.length);

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
    } else if(this.checklist_request.length !== this.checklist.length) {
      Swal.fire({
        text: 'Debe de seleccionar todos los items del Checklist',
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
    this.fetapa.ChatarraPeso = Number(this.proceso_obtenido.ProcesoEtapa.VehiculoPeso);
    this.fetapa.ChatarraPeso = Number(this.form_etapa.value.peso_real);
    this.fetapa.FechaInicio = this.obtener_fecha_inicial();
    this.fetapa.FechaFin = this.obtener_fecha_final();
    this.fetapa.Estado = 'T';
    this.fetapa.Checklist = this.checklist_request;

    this._procesoEtapaService.iniciar_etapa(this.ietapa).
    subscribe(resp_ietapa => {      
      
      this._procesoEtapaService.finalizar_etapa(this.fetapa).
      subscribe( resp_fetapa => {
        this.descargar_informe();
        Swal.fire({
          text: 'Verificación Física finalizada',
          width: 350,
          padding: 15,
          timer: 3000,
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'success'
        }).then( result => {
          this._router.navigate(['/etapa/verificacion-fisica']);
        });
        
      })

    })

  }

  obtener_fecha_inicial() {
    const fecha = this.form_etapa.value.fecha_inicio;
    const hora = this.form_etapa.value.hora_inicio;
    return fecha + 'T' + hora + ':00.015Z'
  }

  obtener_fecha_final() {
    const fecha = this.form_etapa.value.fecha_fin;
    const hora = this.form_etapa.value.hora_fin;
    return fecha + 'T' + hora + ':00.015Z'
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
      fecha_fin: new FormControl( null, [Validators.required]),
      hora_fin: new FormControl( null, [Validators.required]),
      peso_estimado: new FormControl( null, [Validators.required]),
      peso_real: new FormControl( null, [Validators.required])

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
      fecha_fin: '',
      hora_fin: '',
      peso_estimado: proceso.ProcesoEtapa.VehiculoPeso,
      peso_real: '',
    })
  }

  deshabilitar_inputs() {
    this.form_etapa.controls['nro_solicitud'].disable();
    this.form_etapa.controls['fecha_solicitud'].disable();
    this.form_etapa.controls['pgm_chatarreo'].disable();

    this.form_etapa.controls['peso_estimado'].disable();
  }

  convertir_fecha(fecha_covertir: string) {
    let fechaFormato = fecha_covertir.split("T",2);
    let fecha = fechaFormato[0];
    let hora = fechaFormato[1];
    return fecha;
  }

  obtener_tipo_di(id_tipo_di: string) {

    return id_tipo_di === '01' ? 'DNI' : 'Carnet extranjería';

  }

  obtener_check(check: Checklist) {
    
    /* if(this.checklist_request.length === 0) {
      this.checklist_request.push(check);
      console.log(this.checklist_request);
      return;
    } */
  /* debugger; */
    if(this.checklist_request.length > 0) {
      for(let i = 0; i < this.checklist_request.length; i++) {
      
        if(this.checklist_request[i].IdChecklist === check.IdChecklist) {
          this.checklist_request.splice(i, 1); 
          console.log(this.checklist_request);
          return;
        }
      }
    }    

    this.checklist_request.push(check);   
    console.log(this.checklist_request);   

  }

  descargar_informe() {

    let id_etapa = this.proceso_obtenido.Etapa.IdEtapa;
    let id_proceso = this.proceso_obtenido.IdProceso;
    let token =this.token;

    this._procesoEtapaService.descargar_informe(id_etapa, encodeURI(token)).
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

  

}

















































/* items: GalleryItem[]; */

// Constructor()
/* public gallery: Gallery */

/* const data = [
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  }
]; */

// ngOnInit
 // 1. Create gallery items
/*  this.items = data.map(item =>
  new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
); */

// Load items into the lightbox
/* this.basicLightboxExample(); */

// Load item into different lightbox instance
// With custom gallery config
/* this.withCustomGalleryConfig(); */


// Afuera
/* basicLightboxExample() {
  this.gallery.ref().load(this.items);
}

withCustomGalleryConfig() {

  // 2. Get a lightbox gallery ref
  const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

  // (Optional) Set custom gallery config to this lightbox
  lightboxGalleryRef.setConfig({
    imageSize: ImageSize.Cover,
    thumbPosition: ThumbnailsPosition.Top
  });

  // 3. Load the items into the lightbox
  lightboxGalleryRef.load(this.items);
} */
