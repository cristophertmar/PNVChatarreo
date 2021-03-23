import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { MatDialog } from '@angular/material/dialog';
import { AprobarComponent } from '../../modals/aprobar/aprobar.component';
import { ObservarComponent } from '../../modals/observar/observar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagenGaleria } from '../../models/imgGaleria.model';

@Component({
  selector: 'app-evaluacion-documentaria-editar',
  templateUrl: './evaluacion-documentaria-editar.component.html',
  styles: [
  ]
})
export class EvaluacionDocumentariaEditarComponent implements OnInit {

  form_busqueda: FormGroup;
  form_principal: FormGroup;

  imagenGaleria: ImagenGaleria = {};
  data: ImagenGaleria[] = [];
  
  imagenTemp: string;

  items: GalleryItem[];

  @ViewChild('selectorImagen') selectorImagen: ElementRef<HTMLElement>;

  constructor(public gallery: Gallery, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.crearFormularios();
    this.mostrarImagenes();
     
  }

  mostrarImagenes() {

    // 1. Create gallery items
    this.items = this.data.map(item =>
      new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );
    
    // Load items into the lightbox
    this.basicLightboxExample();
    
    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig();
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

  abrirModal_aprobar() {
    /* this.dialog.open(RecuperarCuentaComponent); */
    const dialogRef = this._dialog.open(AprobarComponent);
  }

  abrirModal_observar() {
    /* this.dialog.open(RecuperarCuentaComponent); */
    const dialogRef = this._dialog.open(ObservarComponent);
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
      tipo_documento_repre: new FormControl( null, [Validators.required]),
      nro_documento_repre: new FormControl( null, [Validators.required]),
      nombre_repre: new FormControl( null, [Validators.required]),
      correo_repre: new FormControl( null, [Validators.required]),
      celular_repre: new FormControl( null, [Validators.required]),

      // Datos de la solicitud
      fecha_solicitud: new FormControl( null, [Validators.required]),
      pgm_chatarreo: new FormControl( null, [Validators.required]),
      ent_promotora: new FormControl( null, [Validators.required]),
      distrito_solicitud: new FormControl( null, [Validators.required])

    });

  }

  seleccionarImagen(){
    this.selectorImagen.nativeElement.click();
  }

  Buscar_placa() {

    if ( this.form_busqueda.invalid ) {
      return Object.values( this.form_busqueda.controls).forEach( control => {
        control.markAsTouched();
      });
    }

    console.log(this.form_busqueda.value.nro_placa);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                  let imagen = event.target.result;
                   /*this.urls.push(event.target.result);*/
                  this.imagenGaleria = {}
                  this.imagenGaleria.srcUrl = 'https://preview.ibb.co/jrsA6R/img12.jpg';
                  this.imagenGaleria.previewUrl = 'https://preview.ibb.co/jrsA6R/img12.jpg';

                  /* console.log(this.imagenGaleria); */
                  this.data.push(this.imagenGaleria);
                }

                reader.readAsDataURL(event.target.files[i]);
        }

        this.mostrarImagenes();
    }
  }

  seleccionImagen(archivo: File) {
    /* console.log(archivos[0]); */

    /* let archivo: File; */
    /* archivo = archivos[0]; */

    /* const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
 
    reader.onloadend = () => this.imagenTemp = reader.result.toString(); */

    
    
    /* this.imagenGaleria = {}
    this.imagenGaleria.srcUrl = this.imagenTemp;
    this.imagenGaleria.previewUrl = this.imagenTemp;
    console.log(this.imagenGaleria);
    this.data.push(this.imagenGaleria); */



  }

  /* onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                  debugger;
                  const archivo = event.target.files[i];

                  const reader = new FileReader();
                  const urlImagenTemp = reader.readAsDataURL(archivo);

                  console.log(urlImagenTemp);

                  this.imagenGaleria = {}
                  this.imagenGaleria.srcUrl = event.target.files[i];
                  this.imagenGaleria.previewUrl = event.target.files[i];

                  this.data.push(this.imagenGaleria);
                  this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  } */



}


const data = [
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  }
];
