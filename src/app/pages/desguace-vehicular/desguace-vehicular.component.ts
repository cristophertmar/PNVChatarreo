import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desguace-vehicular',
  templateUrl: './desguace-vehicular.component.html',
  styles: [
  ]
})
export class DesguaceVehicularComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  editar(){
    this._router.navigate(['/desguace-vehicular', 1]);
  }

}
