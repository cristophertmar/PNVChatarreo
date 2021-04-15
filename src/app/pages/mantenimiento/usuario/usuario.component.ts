import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MantenimientoUsuarioComponent } from '../../../modals/mantenimiento-usuario/mantenimiento-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  editar(){
    const dialogRef = this._dialog.open(MantenimientoUsuarioComponent);
  }

}
