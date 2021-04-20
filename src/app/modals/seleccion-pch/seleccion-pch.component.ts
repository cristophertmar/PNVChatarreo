import { Component, OnInit } from '@angular/core';
import { PchService } from '../../services/pch.service';
import { Pch } from '../../models/pch.model';

@Component({
  selector: 'app-seleccion-pch',
  templateUrl: './seleccion-pch.component.html',
  styles: [
  ]
})
export class SeleccionPchComponent implements OnInit {

  pchs: Pch[];

  constructor(
    private _pchService: PchService
  ) { }

  ngOnInit(): void {
    this.listar_pch();
  }

  listar_pch() {
    this._pchService.getPCHActive('A')
    .subscribe((resp: Pch[]) => {
      this.pchs = [];
      this.pchs = resp;
    });
  }

  seleccionar_pch(pch: Pch) {  
    this._pchService.enviar_pch_seleccionado(pch);
  }

}
