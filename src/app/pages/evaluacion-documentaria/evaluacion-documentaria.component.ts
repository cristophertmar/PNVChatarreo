import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evaluacion-documentaria',
  templateUrl: './evaluacion-documentaria.component.html',
  styles: [
  ]
})
export class EvaluacionDocumentariaComponent implements OnInit {


  constructor(private _router: Router) { }

  ngOnInit(): void {
    
  }

  ver(){
    this._router.navigate(['/evaluacion-documentaria', 1]);
  }



}
