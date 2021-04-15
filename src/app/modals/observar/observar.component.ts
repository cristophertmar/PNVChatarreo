import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Pch } from "../../models/pch.model";
import { Pco } from "../../models/pco.model";

import { PchService } from "../../services/pch.service";
import { PcoService } from "../../services/pco.service";

import Swal from "sweetalert2";

export interface Observacion {
  name: string;
  elegido: boolean;
}

@Component({
  selector: 'app-observar',
  templateUrl: './observar.component.html',
  styles: [
  ]
})

export class ObservarComponent implements OnInit {
  @ViewChild('btncerrarRechazar') btncerrarRechazar: ElementRef<HTMLElement>;

  pch: Pch;
  pco: Pco;
  tipo: string;
  obs: Observacion[] = [
    {name: "Falta documentación técnica", elegido: false},
    {name: "Falta documentación económica", elegido: false},
    {name: "Beneficios insuficientes", elegido: false},
    {name: "Población indeterminada", elegido: false},
    {name: "Impacto medio ambiental", elegido: false}
  ];

  constructor(
    private _pchService : PchService,
    private _pcoService : PcoService
  ) {

  }

  ngOnInit(): void {
  }
  
  observar(){
    var motivo: string = "";

    this.obs.forEach(function (value) {
      if(value.elegido){
        if(motivo === ""){
          motivo = value.name;
        } else {
          motivo = motivo + "," + value.name;
        }
      }
    });

    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    
    if(this.tipo === "PCH"){
      this.pch.Estado = "O";
      this.pch.Motivo = motivo;
  
      this._pchService.observarPch(this.pch).subscribe( resp => {
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
      this.pco.Estado = "O";
      this.pco.Motivo = motivo;
  
      this._pcoService.observarPco(this.pco).subscribe( resp => {
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
    }
  }

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarRechazar","1");

    if (!exito){
      localStorage.setItem("cerrarRechazar","2");
    }

    this.btncerrarRechazar.nativeElement.click();
  }

}
