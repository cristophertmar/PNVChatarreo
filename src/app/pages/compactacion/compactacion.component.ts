import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compactacion',
  templateUrl: './compactacion.component.html',
  styles: [
  ]
})
export class CompactacionComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  editar(){
    this._router.navigate(['/compactacion', 1]);
  }


}
