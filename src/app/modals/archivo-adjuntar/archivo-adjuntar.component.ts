import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArchivoEtapa } from 'app/models/archivoEtapa.model';
import Swal from 'sweetalert2';
import { ArchivoService } from '../../services/archivo.service';

@Component({
  selector: 'app-archivo-adjuntar',
  templateUrl: './archivo-adjuntar.component.html',
  styleUrls: ['./archivo-adjuntar.component.css']
})
export class ArchivoAdjuntarComponent implements OnInit {

  @ViewChild('btncerrarmodal') btncerrarmodal: ElementRef<HTMLElement>;
  @ViewChild('btn_select_doc') btn_select_doc: ElementRef<HTMLElement>;
  

  archivo_evaluar: ArchivoEtapa;
  peso_maximo = 200000; // 200kb
  extensiones_permitidas: string[];


  constructor(
    private _archivoService: ArchivoService
  ) {
    this.archivo_evaluar = _archivoService.archivo_evaluar;
  }

  ngOnInit(): void {
    this.obtener_lista_extensiones();
    /* console.log('Extensiones permitidas', this.extensiones_permitidas); */
  }

  obtener_ubicacion_extension(extension: string) {
      return 'assets/img/icons-form/' + extension + '.svg'
  }

  obtener_lista_extensiones(){
    var lista = this.archivo_evaluar.Extension.split('.');
    lista.shift();
    this.extensiones_permitidas = lista;
    
  }

  cerrar_modal() {
    this.btncerrarmodal.nativeElement.click();
  }

  pulsarCambio() {
    this.btn_select_doc.nativeElement.click();
  }

  // archivo: File
  seleccion_archivo( archivo: File){       
    
    let cadena_evaluar: string[] = archivo.name.split('.');

    for(let i = 0; i < this.extensiones_permitidas.length; i++) {

      let extension = this.extensiones_permitidas[i];
      
      if(cadena_evaluar.indexOf(extension) != -1){
        
        if(archivo.size <= this.peso_maximo) {

          this.archivo_evaluar.archivo_adjunto = archivo;

          this._archivoService.obtener_archivo_aprobado(this.archivo_evaluar);

          Swal.fire({
            text: 'Adjuntado exitosamente',
            width: 350,
            padding: 15,
            timer: 2000,
            allowOutsideClick: false,
            showConfirmButton: false,
            icon: 'success'
          });

          this.cerrar_modal();

          return;

        } else {
          Swal.fire({
            text: 'El archivo excede los 200kb',
            width: 350,
            padding: 15,
            timer: 2000,
            allowOutsideClick: false,
            showConfirmButton: false,
            icon: 'error'
          });
          return;
        }

      } 

    }

    Swal.fire({
      text: 'Extensión no válida',
      width: 350,
      padding: 15,
      timer: 2000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'error'
    });
    return;

    
    
   
    
    
    /* const Toast = Swal.mixin({
      timer: 2000,
      width: 350,
      padding: 15,
      allowOutsideClick: false,
      showConfirmButton: false
    });

    if (!archivo) {
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Toast.fire({
        icon: 'error',
        title: 'No es una imagen'
      });
      return;
    } */



  }

}
