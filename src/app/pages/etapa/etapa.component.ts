import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Proceso } from 'app/models/proceso.model';
import { ProcesoService } from 'app/services/proceso.service';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styles: [
  ]
})
export class EtapaComponent implements OnInit {

  form_busqueda: FormGroup;
  procesos: Proceso[];
  nom_etapa: string = 'evaluacion-documentaria';
  id_etapa: number = 1;

  constructor(
    private _procesoService: ProcesoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.nom_etapa = params.get('nom_etapa');
      this.obtener_id_etapa();
      this.buscar_proceso();
    });     
    
  }

  obtener_id_etapa() {
    switch (this.nom_etapa) {
      case 'evaluacion-documentaria':
        this.id_etapa = 1;
        break;
      case 'verificacion-fisica':
        this.id_etapa = 2;
        break;
      case 'eliminacion-fluidos':
        this.id_etapa = 3;
        break;
      case 'desguace-vehicular':
        this.id_etapa = 4;
        break;
      case 'compactacion':
        this.id_etapa = 5;
        break;   
      default:
        this.id_etapa = 6;
        break;
    }

    this.crearFormulario();
    
  }

  crearFormulario() {

    let item_bus: string = (this.id_etapa === 1? 'O' : 'P');

    // Formulario de Búsqueda
    this.form_busqueda = new FormGroup({
      periodo: new FormControl( '2021', [Validators.required]),
      estado: new FormControl( item_bus, [Validators.required])
    });

  }

  buscar_proceso(){
    this._procesoService.listar_proceso(this.id_etapa, this.form_busqueda.value.periodo, this.form_busqueda.value.estado)
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
    this._router.navigate(['/' + this.nom_etapa, token]);
  }


}
