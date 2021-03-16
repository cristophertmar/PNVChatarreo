import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminacion-fluidos',
  templateUrl: './eliminacion-fluidos.component.html',
  styles: [
  ]
})
export class EliminacionFluidosComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  editar(){
    this._router.navigate(['/eliminacion-fluidos', 1]);
  }

}
