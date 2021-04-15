import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Pch } from "../../models/pch.model";
import { Pco } from '../../models/pco.model';

import { PchService } from "../../services/pch.service";
import { PcoService } from "../../services/pco.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styles: [
  ]
})
export class AprobarComponent implements OnInit {
  @ViewChild('btncerrarAprobar') btncerrarAprobar: ElementRef<HTMLElement>;

  pch: Pch;
  pco: Pco;
  tipo: string;
  codigo: string;

  constructor(
    private _pchService : PchService,
    private _pcoService : PcoService
  ) {

  }

  ngOnInit(): void {
  }
  
  aprobar(){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    
    if(this.tipo === "PCH"){
      this._pchService.aprobarPch(this.pch).subscribe( resp => {
        console.log(resp);
        Swal.close();
        this.cerrar_modal(true);
      }, (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error al autenticar',
          showCancelButton: true
        });
      });
    } else {
      this._pcoService.aprobarPco(this.pco).subscribe( resp => {
        Swal.close();
        this.cerrar_modal(true);
      }, (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error al autenticar',
          showCancelButton: true
        });
      });
    }
  }

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarAprobar","1");

    if (!exito){
      localStorage.setItem("cerrarAprobar","2");
    }

    this.btncerrarAprobar.nativeElement.click();
  }
}
