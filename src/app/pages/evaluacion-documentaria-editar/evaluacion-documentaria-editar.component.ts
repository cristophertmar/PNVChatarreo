import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { MatDialog } from '@angular/material/dialog';
import { AprobarComponent } from '../../modals/aprobar/aprobar.component';
import { ObservarComponent } from '../../modals/observar/observar.component';

@Component({
  selector: 'app-evaluacion-documentaria-editar',
  templateUrl: './evaluacion-documentaria-editar.component.html',
  styles: [
  ]
})
export class EvaluacionDocumentariaEditarComponent implements OnInit {

  items: GalleryItem[];

  constructor(public gallery: Gallery, public _dialog: MatDialog) { }

  ngOnInit(): void {
     // 1. Create gallery items
     this.items = data.map(item =>
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



}

const data = [
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  }/* ,
  {
    srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  } */
];
