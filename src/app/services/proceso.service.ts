import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { ProcesoRequest } from '../models/procesoRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  loading: boolean =  false;

  constructor(
    private _http: HttpClient
  ) { }

  guardar_proceso(proceso_request: ProcesoRequest) {
    
    let url: string;
    url = URL_SERVICIOS + 'api/proceso';

    const headers = new HttpHeaders({
      'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
    });

    return this._http.post(url, proceso_request, { headers });

  }

  listar_proceso(id_etapa: number, periodo: string, estado: string = 'P') {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso?idEtapa='+ id_etapa +'&Estado=' + estado + '&Anio=' + periodo;

    const headers = new HttpHeaders({
      'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
    });

    return this._http.get(url, { headers });
  }

  obtener_proceso_token(token: string) {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso?token=' + token;

    const headers = new HttpHeaders({
      'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
    });

    return this._http.get(url, { headers });
  }
  
}
