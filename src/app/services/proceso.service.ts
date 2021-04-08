import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { ProcesoRequest } from '../models/procesoRequest.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  loading: boolean =  false;
  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  guardar_proceso(proceso_request: ProcesoRequest) {
    
    let url: string;
    url = URL_SERVICIOS + 'api/proceso';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.post(url, proceso_request, { headers });

  }

  listar_proceso(id_etapa: number, periodo: string, estado: string = 'P') {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso?idEtapa='+ id_etapa +'&Estado=' + estado + '&Anio=' + periodo;

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }

  obtener_proceso_token(token: string) {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso?token=' + token;

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }
  
}
