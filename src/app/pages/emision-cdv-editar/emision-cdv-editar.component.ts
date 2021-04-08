import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emision-cdv-editar',
  templateUrl: './emision-cdv-editar.component.html',
  styles: [
  ]
})
export class EmisionCdvEditarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
