import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CargarNumerosComponent } from '../../modals/cargar-numeros/cargar-numeros.component';
import { MantenimientoPcoComponent } from '../../modals/mantenimiento-pco/mantenimiento-pco.component';

@Component({
  selector: 'app-chatarreo-obligatorio',
  templateUrl: './chatarreo-obligatorio.component.html',
  styles: [
  ]
})
export class ChatarreoObligatorioComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModal_mantenimiento() {
    const dialogRef = this._dialog.open(MantenimientoPcoComponent);
  }

  abrirModal_carga() {
    const dialogRef = this._dialog.open(CargarNumerosComponent);
  }

  

}
