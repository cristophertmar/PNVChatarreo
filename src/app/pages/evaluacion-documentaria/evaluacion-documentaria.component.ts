import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { Proceso } from '../../models/proceso.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-evaluacion-documentaria',
  templateUrl: './evaluacion-documentaria.component.html',
  styles: [
  ]
})
export class EvaluacionDocumentariaComponent implements OnInit {

  form_busqueda: FormGroup;
  procesos: Proceso[];

  constructor(
    private _procesoService: ProcesoService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.buscar_proceso();
  }

  crearFormulario() {

    // Formulario de Búsqueda
    this.form_busqueda = new FormGroup({
      periodo: new FormControl( '2021', [Validators.required]),
      estado: new FormControl( 'P', [Validators.required])
    });

  }

  buscar_proceso(){
    this._procesoService.listar_proceso(this.form_busqueda.value.periodo, this.form_busqueda.value.estado)
    .subscribe((resp: Proceso[]) => {
      this.procesos = resp;
    });
  }

  retornar_estado(estado: string) {

    let estado_return = '';
    
    if(estado === 'O'){
      estado_return = 'OBS'
    } else if(estado === 'A') {
      estado_return = 'ACT'
    } else {
      estado_return = 'PEN'
    }

    return estado_return;

  }

  nuevo(){
    this._router.navigate(['/evaluacion-documentaria', 'nuevo']);
  }

  ver(token: string){
    this._router.navigate(['/evaluacion-documentaria', token]);
  }



}
