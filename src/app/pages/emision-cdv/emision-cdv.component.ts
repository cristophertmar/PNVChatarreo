import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emision-cdv',
  templateUrl: './emision-cdv.component.html',
  styles: [
  ]
})
export class EmisionCdvComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  editar(){
    this._router.navigate(['/emision-cdv', 1]);
  }


}
