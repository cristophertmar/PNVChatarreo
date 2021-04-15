import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';

import { ArchivoAdjuntarComponent } from 'app/modals/archivo-adjuntar/archivo-adjuntar.component';

import { ArchivoService } from 'app/services/archivo.service';
import { ProcesoService } from 'app/services/proceso.service';
import { VehiculoService } from 'app/services/vehiculo.service';
import { ProcesoEtapaService } from 'app/services/proceso-etapa.service';

import { Proceso } from 'app/models/proceso.model';
import { Vehiculo } from 'app/models/vehiculo.model';
import { ArchivoEtapa } from 'app/models/archivoEtapa.model';
import { ProcesoRequest } from 'app/models/procesoRequest.model';
import { ProcesoResponse } from 'app/models/procesoResponse.model';
import { FinEtapaRequest } from 'app/models/fEtapaRequest.model';
import { IArchivoRequest } from 'app/models/iarchivoRequest.model';
import { InitEtapaRequest } from 'app/models/itEtapaRequest.model';
import { InitEtapaResponse } from 'app/models/iEtapaResponse.model';
import { ObservacionRequest } from 'app/models/observacionRequest.model';

import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-documentaria-editar',
  templateUrl: './evaluacion-documentaria-editar.component.html',
  styles: [
  ]
})
export class EvaluacionDocumentariaEditarComponent implements OnInit {

  form_busqueda: FormGroup;
  form_principal: FormGroup;

  items: GalleryItem[];

  vehiculo: Vehiculo;
  archivos_etapa: ArchivoEtapa[];
  proceso_request: ProcesoRequest;
  proceso_response: ProcesoResponse;
  tipo_observacion: string;
  observacion_request: ObservacionRequest;
  ietapa_request: InitEtapaRequest;
  festapa_request: FinEtapaRequest;
  iarchivo_request: IArchivoRequest;

  proceso_obtenido: Proceso;
  archivos_aprobados: ArchivoEtapa[];

  proceso_token: string;
  estado_proceso: string;
  mostrar_boton_add_img: boolean = true;
  deshabilitar_obs: boolean = false;
  descripcion_obs: string = '';

  fecha_maxima: string = '2021-01-01';
  long_nro_documento = 0;

  constructor(
    public gallery: Gallery, 
    public _dialog: MatDialog,
    private _vehiculoService: VehiculoService,
    private _archivoService: ArchivoService,
    private _procesoService: ProcesoService,
    private _procesoEtapaService: ProcesoEtapaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
      this.tipo_observacion = 'D';
      this.proceso_request = {};
      this.proceso_response = {};
      this.observacion_request = {};
      this.ietapa_request = {};
      this.festapa_request = {};
      this.archivos_aprobados = [];
      this.iarchivo_request = {};
      this.estado_proceso = '';
      this.items = [];
    }

  ngOnInit(): void {
    this.crearFormularios();
    this.obtener_fecha_maxima();
    this._activatedRoute.params.subscribe( ({token}) => {
      if(token != 'nuevo') {
        this.proceso_token = token;
        this.obtener_proceso_token(token);
      } else {
        this.deshabilitarInputs();
        this.listar_archivos_etapa(); 
      }       
    } );    
    
    this.recibir_lista_archivos();  
    this.tipo_documento_repre_listener(); 
    this.basicLightboxExample(); // Load items into the lightbox
    this.withCustomGalleryConfig(); // Load item into different lightbox instance with custom gallery config
  }

  obtener_fecha_maxima() {
    const today = new Date();
    this.fecha_maxima = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }

  tipo_documento_repre_listener() {
    this.form_principal.get('tipo_documento_repre').valueChanges.subscribe( (valor: string) => {
      
      this.form_principal.get('nro_documento_repre').reset();
      
      switch (valor) {
        case '01':
          this.long_nro_documento = 8;
          break;
        case '06':
          this.long_nro_documento = 9;
          break;
        default:
          this.long_nro_documento = 0;
          break;
      }
      
    });
  }

  recibir_lista_archivos() {
    this._archivoService.lista_archivos_enviar.subscribe({
      next: (resp) => {
        this.archivos_aprobados = resp
        
        console.log(this.archivos_aprobados);

        const ultimo_archivo_aprobado: ArchivoEtapa = this.archivos_aprobados[this.archivos_aprobados.length - 1];

        this.archivos_etapa.map( archivo => {
            if(archivo.Descripcion === ultimo_archivo_aprobado.Descripcion) {
                archivo.archivo_adjunto = ultimo_archivo_aprobado.archivo_adjunto;
                if(ultimo_archivo_aprobado.Subtipo === 'E'){
                  this.previewImage(ultimo_archivo_aprobado);
                }
            }
        });

      }
    })
  }

  convertir_fecha(fecha_covertir: string) {
    let fechaFormato = fecha_covertir.split("T",2);
    let fecha = fechaFormato[0];
    let hora = fechaFormato[1];
    return fecha;
  }

  obtener_proceso_token(token: string) {
    this._procesoService.obtener_proceso_token(encodeURIComponent(token))
    .subscribe( (resp: Proceso) => {
      this.proceso_obtenido = resp;
      this.archivos_etapa = this.proceso_obtenido.Etapa.TipoArchivos;
      this.estado_proceso = resp.ProcesoEtapa.Estado;
      this.tipo_observacion = resp.ProcesoEtapa.Estado || 'D';
      this.obtener_estado_observacion(resp.ProcesoEtapa.Estado || 'D');
      this.setear_datos_proceso(this.proceso_obtenido);
      this.deshabilitarInputs(this.proceso_obtenido);
      this.setImagenes();
    });
  }

  quitar_archivo(i: number) {
    this.archivos_etapa[i].archivo_adjunto = null;
  }

  setear_datos_proceso(proceso: Proceso) {

    this.form_busqueda.setValue({
      nro_placa: proceso.VehiculoPlaca
    })

    this.form_principal.setValue({

      // Datos del Propietario
      tipo_documento_prop:   proceso.PropietarioTipoDI,
      nro_documento_prop:    proceso.PropietarioNumeroDI,
      nombre_prop:           proceso.PropietarioNombre,

      // Datos del Vehículo
      nro_chasis_veh:        proceso.VehiculoNroChasis,
      nro_motor_veh:         proceso.VehiculoNroMotor,
      vin_veh:               proceso.VehiculoVIN,
      modelo_veh:            proceso.VehiculoModelo,
      marca_veh:             proceso.VehiculoMarca,
      anio_veh:              proceso.VehiculoAnoFabricacion,
      combustible_veh:       proceso.VehiculoCombustible,
      categoria_veh:         proceso.VehiculoCategoria,

       // Datos del representante
       tipo_documento_repre: proceso.SolicitanteTipoDI,
       nro_documento_repre:  proceso.SolicitanteNumeroDI,
       nombre_repre:         proceso.SolicitanteNombre,
       correo_repre:         proceso.SolicitanteCorreo,
       celular_repre:        proceso.SolicitanteTelefono,
 
       // Datos de la solicitud
       fecha_solicitud:      this.convertir_fecha(proceso.FechaInicio),
       pgm_chatarreo:        proceso.Tipo,
       ent_promotora:        '',
       distrito_solicitud:   '',

       // Datos del estado de la etapa
       descripcion_obs: this. descripcion_obs

    });
  }

  obtenerFecha_actual(){
    let hoy = new Date();
    let fechaInicioFormato = hoy.toISOString();
    return fechaInicioFormato;
  }

  listar_archivos_etapa(tipo_proceso: string = 'O') {
    this._archivoService.obtener_archivo_etapa(1, tipo_proceso)
    .subscribe( (resp: ArchivoEtapa[]) => {
        this.archivos_etapa = resp;
        this.setImagenes();
    });
  }

  crearFormularios() {

    // Formulario de Búsqueda
    this.form_busqueda = new FormGroup({
      nro_placa: new FormControl( null, [Validators.required, Validators.minLength(6)])
    });

    // Formulario Principal
    this.form_principal = new FormGroup({

      // Datos del Propietario
      tipo_documento_prop: new FormControl( null, [Validators.required]),
      nro_documento_prop: new FormControl( null, [Validators.required]),
      nombre_prop: new FormControl( null, [Validators.required]),

      // Datos del Vehículo
      nro_chasis_veh: new FormControl( null, [Validators.required]),
      nro_motor_veh: new FormControl( null, [Validators.required]),
      vin_veh: new FormControl( null, [Validators.required]),
      modelo_veh: new FormControl( null, [Validators.required]),
      marca_veh: new FormControl( null, [Validators.required]),
      anio_veh: new FormControl( null, [Validators.required]),
      combustible_veh: new FormControl( null, [Validators.required]),
      categoria_veh: new FormControl( null, [Validators.required]),

      // Datos del representante
      tipo_documento_repre: new FormControl( "00", [Validators.required, Validators.pattern('^(?!.*00).*$')]),
      nro_documento_repre: new FormControl( null, [Validators.required]),
      nombre_repre: new FormControl( null, [Validators.required]),
      correo_repre: new FormControl( null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      celular_repre: new FormControl( null, [Validators.required, Validators.min(900000000)]),

      // Datos de la solicitud
      fecha_solicitud: new FormControl( null, [Validators.required]),
      pgm_chatarreo: new FormControl( 'V', [Validators.required]),
      ent_promotora: new FormControl( null ),
      distrito_solicitud: new FormControl( null ),

      // Datos del estado de la etapa
      descripcion_obs: new FormControl(null)

    });

  }

  deshabilitarInputs(proceso_obtenido?: Proceso) {
    
    if(this.proceso_obtenido) {

      this.form_busqueda.controls['nro_placa'].disable();

      this.form_principal.controls['tipo_documento_repre'].disable();
      this.form_principal.controls['nro_documento_repre'].disable();
      this.form_principal.controls['nombre_repre'].disable();
      this.form_principal.controls['correo_repre'].disable();
      this.form_principal.controls['celular_repre'].disable();

      this.form_principal.controls['fecha_solicitud'].disable();
      this.form_principal.controls['pgm_chatarreo'].disable();
    }

    // Datos del Propietario
    this.form_principal.controls['tipo_documento_prop'].disable();
    this.form_principal.controls['nro_documento_prop'].disable();
    this.form_principal.controls['nombre_prop'].disable();

    // Datos del Vehículo
    this.form_principal.controls['nro_chasis_veh'].disable();
    this.form_principal.controls['nro_motor_veh'].disable();
    this.form_principal.controls['vin_veh'].disable();
    this.form_principal.controls['modelo_veh'].disable();
    this.form_principal.controls['marca_veh'].disable();
    this.form_principal.controls['anio_veh'].disable();
    this.form_principal.controls['combustible_veh'].disable();
    this.form_principal.controls['categoria_veh'].disable();  
    

  }

  volverEtapa(){
    this._router.navigate(['/etapa/evaluacion-documentaria']);
  }
  
  Buscar_placa() {

    if ( this.form_busqueda.invalid ) {
      return;
    }
    const placa = this.form_busqueda.value.nro_placa;    
    this._vehiculoService.obtener_vehiculo(placa)
    .subscribe(
      (resp: Vehiculo) => {     
        this.vehiculo = new Vehiculo(); 
        this.vehiculo = resp;
        /* console.log(this.vehiculo); */
        this.setear_datos_placa();
      },
      (error: any) => {
          // console.log(error);
      },
      () => {}
    );

  }

  setear_datos_placa(seleccion_repre: boolean = false) {

    let tipo_documento_repre_prop = "00";
    let nro_documento_repre_prop = null;
    let nombre_repre_prop = null;

    if(seleccion_repre) {
      tipo_documento_repre_prop = "01";
      nro_documento_repre_prop = this.vehiculo.Propietarios[0].NumeroDI;
      nombre_repre_prop = this.vehiculo.Propietarios[0].Nombres;
    }

    this.form_principal.setValue({

      // Datos del Propietario
      tipo_documento_prop:   this.vehiculo.Propietarios[0].TipoDI,
      nro_documento_prop:    this.vehiculo.Propietarios[0].NumeroDI,
      nombre_prop:           this.vehiculo.Propietarios[0].Nombres,

      // Datos del Vehículo
      nro_chasis_veh:        this.vehiculo.NumeroChasis,
      nro_motor_veh:         this.vehiculo.NumeroMotor,
      vin_veh:               this.vehiculo.VIN,
      modelo_veh:            this.vehiculo.Modelo,
      marca_veh:             this.vehiculo.Marca,
      anio_veh:              this.vehiculo.AnoFabricacion,
      combustible_veh:       this.vehiculo.Combustible,
      categoria_veh:         this.vehiculo.Categoria,

       // Datos del representante
       tipo_documento_repre: tipo_documento_repre_prop,
       nro_documento_repre:  nro_documento_repre_prop,
       nombre_repre:         nombre_repre_prop,
       correo_repre:         '',
       celular_repre:        '',
 
       // Datos de la solicitud
       fecha_solicitud:      this.form_principal.value.fecha_solicitud,
       pgm_chatarreo:        this.form_principal.value.pgm_chatarreo,
       ent_promotora:        this.form_principal.value.ent_promotora,
       distrito_solicitud:   this.form_principal.value.distrito_solicitud,
      
       // Datos del estado de la etapa
       descripcion_obs:     this.form_principal.value.descripcion_obs

    });
  }

  mismo_representante(seleccion: boolean) {
      this.setear_datos_placa(seleccion);
  }  

  obtener_estado_observacion(tipo_observacion: string) {
      this.tipo_observacion = tipo_observacion;
      if((this.tipo_observacion === 'O') && (this.estado_proceso === 'O')) {
        this.deshabilitar_obs = true;
        this.descripcion_obs = this.proceso_obtenido.ProcesoEtapa.Observacion;
        return;
      }
      this.deshabilitar_obs = false;
      this.descripcion_obs = '';
      
  }

  guardar_proceso() {
    
    if(this.form_principal.invalid || this.form_busqueda.invalid) {    
      Object.values( this.form_busqueda.controls).forEach( control => {
        control.markAsTouched();
      });
      Swal.fire({
        text: 'Llene todos los campos obligatorios',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      });  
      return;
    } else if ((document.getElementById("tipo_documento_prop") as HTMLInputElement).value.length < 1) {
      Swal.fire({
        text: 'Debe enviar los datos del propietario y del vehículo',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      });  
      return;
    }

    const arch_aprobados = this.archivos_aprobados.filter(arch => arch.Obligatorio === 'S');
    const arch_etapa = this.archivos_etapa.filter(arch => arch.Obligatorio === 'S');

    console.log(arch_aprobados);
    console.log(arch_etapa);

    if((arch_aprobados.length) < (arch_etapa.length)) {
      Swal.fire({
        text: 'Adjunte todos los documentos obligatorios',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      });  
      return;
    }    

    this.proceso_request.Tipo = this.form_principal.value.pgm_chatarreo;
    this.proceso_request.VehiculoPlaca = this.form_busqueda.value.nro_placa;
    this.proceso_request.SolicitanteTipoDI = this.form_principal.value.tipo_documento_repre;
    this.proceso_request.SolicitanteNumeroDI = this.form_principal.value.nro_documento_repre;
    this.proceso_request.SolicitanteNombre = this.form_principal.value.nombre_repre;
    this.proceso_request.SolicitanteCorreo = this.form_principal.value.correo_repre;
    this.proceso_request.SolicitanteTelefono = this.form_principal.value.celular_repre + '';
    this.proceso_request.PropietarioTipoDI = "01";
    this.proceso_request.PropietarioNumeroDI = this.form_principal.getRawValue().nro_documento_prop;
    this.proceso_request.PropietarioNombre = this.form_principal.getRawValue().nombre_prop;
    

    this._procesoService.guardar_proceso(this.proceso_request).
    subscribe( (resp_crea: ProcesoResponse) => {
      this.proceso_response = resp_crea;
      
      this.ietapa_request.IdProceso = resp_crea.IdProceso;
      this.ietapa_request.IdEtapa = resp_crea.Etapa.IdEtapa;
      this.ietapa_request.FechaInicio = this.obtenerFecha_actual();
      this.ietapa_request.Estado = 'A';

      this._procesoEtapaService.iniciar_etapa(this.ietapa_request)
      .subscribe( (resp_ini: InitEtapaResponse) => {
      
        if(this.tipo_observacion === 'O' && !(this.estado_proceso === 'O')) {

          this.observacion_request.IdProceso = resp_crea.IdProceso;
          this.observacion_request.IdEtapa = resp_ini.IdEtapa;
          this.observacion_request.Observacion = this.form_principal.value.descripcion_obs;
          this.observacion_request.Estado = this.tipo_observacion;
          
          this._procesoEtapaService.observar_etapa(this.observacion_request)
          .subscribe(resp_obs => {
                this.volverEtapa();
                return;
          });
        }

        for(let i = 0; i < this.archivos_aprobados.length; i++) {
        
          this.iarchivo_request = {};
          this.iarchivo_request.IdProceso = resp_crea.IdProceso;
          this.iarchivo_request.IdEtapa = resp_ini.IdEtapa;
          this.iarchivo_request.IdTipoArchivo = this.archivos_aprobados[i].IdTipoArchivo;
          this.iarchivo_request.Nombre = this.archivos_aprobados[i].archivo_adjunto.name;

          this._archivoService.insertar_archivo(this.iarchivo_request)
          .subscribe((resp_token: string) => {
              this._archivoService.cargar_archivo(encodeURIComponent(resp_token), this.archivos_aprobados[i].archivo_adjunto).
              subscribe(resp => {
                
                if( i === (this.archivos_aprobados.length - 1)){
                  
                  
                  this.festapa_request.IdProceso = resp_crea.IdProceso;
                  this.festapa_request.IdEtapa = resp_ini.IdEtapa;
                  this.festapa_request.FechaInicio = this.ietapa_request.FechaInicio;
                  this.festapa_request.FechaFin = this.obtenerFecha_actual();
                  this.festapa_request.Estado = 'T';
                  this.festapa_request.Checklist = [];
          
                  this._procesoEtapaService.finalizar_etapa(this.festapa_request)
                  .subscribe( resp => {
                    this.descargar_informe(resp_ini.IdEtapa, encodeURIComponent(resp_crea.Token), resp_crea.IdProceso);
                    Swal.fire({
                      text: 'Evaluación documentaria finalizada',
                      width: 350,
                      padding: 15,
                      timer: 2000,
                      allowOutsideClick: false,
                      showConfirmButton: false,
                      icon: 'success'
                    }).then( result => {
                      this.volverEtapa();
                    });
                    
                  })

                }

              },
              (error: any) => {
                Swal.fire({
                  text: 'Ocurrió un problema al cargar el archivo ' + this.archivos_aprobados[i].archivo_adjunto.name,
                  width: 350,
                  padding: 15,
                  timer: 2000,
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  icon: 'error'
                });
                return;
              },
              () => {}
              );
          });

        }
            
      });

    },
    (error: any) => {
      console.log(error);
    },
    () => {}
    )

  }


  

  descargar_informe(id_etapa: number, token: string, id_proceso: number) {
    
      this._procesoEtapaService.descargar_informe( id_etapa, token).
      subscribe(resp => {
      
        const blob_data = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([blob_data], { type: 'application/pdf' }); 
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = 'evaluación_documentaria_nro_1'+ id_proceso +'.pdf';
        anchor.href = url;
        anchor.click();
      },
      (error) => {
        console.error('ERROR', error);
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

  adjuntar_archivo(archivo: ArchivoEtapa) {

    this._archivoService.obtener_archivo_evaluar(archivo);

    const dialogRef = this._dialog.open(ArchivoAdjuntarComponent, {
        width: '700px'
    });
  }

  quitarImagen(idxImg: number){
    for(let i=0; i<this.archivos_etapa.length; i++){
      if(this.archivos_etapa[i].Subtipo === "E" && this.archivos_etapa[i].IdTipoArchivo === (idxImg + 1)){
        this.archivos_etapa[i].archivo_adjunto = null;
        this.items[idxImg].data.src = "../../../assets/img/image_default.png";
        this.items[idxImg].data.thumb = "../../../assets/img/image_default.png";
        this.mostrar_boton_add_img = true;

        break;
      }
    }
  }

  setImagenes(){
    for(let i=0; i<this.archivos_etapa.length; i++){
      if(this.archivos_etapa[i].Subtipo === "E"){
        const urlImg = this.archivos_etapa[i].Token ? "../../../assets/img/image_default.png" : "../../../assets/img/image_default.png";
        this.items.push(new ImageItem({ src: urlImg, thumb: urlImg }));
      }
    }

    this.mostrarBotonAgregarImg();
  }

  previewImage(uplImg: ArchivoEtapa){
    var idx: number = 0;
    var reader = new FileReader();

    for(let i=0; i<this.items.length; i++){
      var src: string = this.items[i].data.src as string;
      if(src.endsWith('image_default.png')){
        idx = i;
        break;
      }
    }
    
    reader.onloadend = () => {
      this.items[idx].data.src = reader.result;
      this.items[idx].data.thumb = reader.result;

      this.mostrarBotonAgregarImg();
    }

    reader.readAsDataURL(uplImg.archivo_adjunto);
  }

  mostrarBotonAgregarImg(){
    this.mostrar_boton_add_img = false;
    for(let i=0; i<this.items.length; i++){
      var src: string = this.items[i].data.src as string;
      if(src.endsWith('image_default.png')){
        this.mostrar_boton_add_img = true;

        break;
      }
    }
  }

  adjuntar_imagen(){
    var idx: number = 0;
    
    for(let i=0; i<this.items.length; i++){
      var src: string = this.items[i].data.src as string;
      if(src.endsWith('image_default.png')){
        idx = i;
        break;
      }
    }

    for(let i=0; i<this.archivos_etapa.length; i++){
      if(this.archivos_etapa[i].Subtipo === "E"){
        if(this.archivos_etapa[i].IdTipoArchivo === (idx + 1)){
          this._archivoService.obtener_archivo_evaluar(this.archivos_etapa[i]);

          const dialogRef = this._dialog.open(ArchivoAdjuntarComponent, {
              width: '700px'
          });

          break;
        }
      }
    }
  }

  basicLightboxExample() {
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
  }
}