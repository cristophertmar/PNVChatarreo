import { Component, OnInit } from '@angular/core';

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
        Swal.close();
      }, (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error al autenticar',
          showCancelButton: true
          /*text: err.error.error.message*/
        });
      });
    } else {
      this._pcoService.aprobarPco(this.pco).subscribe( resp => {
        console.log(resp);
        Swal.close();
      }, (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error al autenticar',
          showCancelButton: true
          /*text: err.error.error.message*/
        });
      });
    }
  }
}
