import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MantenimientoPchComponent } from '../../modals/mantenimiento-pch/mantenimiento-pch.component';
import { AprobarComponent } from '../../modals/aprobar/aprobar.component';
import { ObservarComponent } from '../../modals/observar/observar.component';

@Component({
  selector: 'app-programa-chatarreo',
  templateUrl: './programa-chatarreo.component.html',
  styles: [
  ]
})
export class ProgramaChatarreoComponent implements OnInit {

  constructor(public _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModal_mantenimiento() {
    const dialogRef = this._dialog.open(MantenimientoPchComponent);
  }

  abrirModal_aprobar() {
    const dialogRef = this._dialog.open(AprobarComponent);
  }

  abrirModal_rechazar() {
    const dialogRef = this._dialog.open(ObservarComponent);
  }

}
