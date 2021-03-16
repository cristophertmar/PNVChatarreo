import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificacion-fisica',
  templateUrl: './verificacion-fisica.component.html',
  styles: [
  ]
})
export class VerificacionFisicaComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  editar(){
    this._router.navigate(['/verificacion-fisica', 1]);
  }

}
