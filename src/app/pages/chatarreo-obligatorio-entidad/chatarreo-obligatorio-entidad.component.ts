import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AprobarComponent } from 'app/modals/aprobar/aprobar.component';
import { ObservarComponent } from 'app/modals/observar/observar.component';

@Component({
  selector: 'app-chatarreo-obligatorio-entidad',
  templateUrl: './chatarreo-obligatorio-entidad.component.html',
  styles: [
  ]
})
export class ChatarreoObligatorioEntidadComponent implements OnInit {

  constructor(public _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModal_aprobar() {
    const dialogRef = this._dialog.open(AprobarComponent);
  }

  abrirModal_rechazar() {
    const dialogRef = this._dialog.open(ObservarComponent);
  }

}
