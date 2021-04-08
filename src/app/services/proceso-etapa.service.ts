import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { FinEtapaRequest } from 'app/models/fEtapaRequest.model';
import { ObservacionRequest } from 'app/models/observacionRequest.model';
import { InitEtapaRequest } from '../models/itEtapaRequest.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoEtapaService {

  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ){ 
    this.token = this._usuarioService.token;
  }

  iniciar_etapa(etapa_request: InitEtapaRequest) {
    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, etapa_request, { headers });

  }

  finalizar_etapa(festapa_request: FinEtapaRequest){
    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, festapa_request, { headers });
  }


  observar_etapa(observacion_request: ObservacionRequest) {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, observacion_request, { headers });

  }

  descargar_informe() {
    /* id_etapa: number, token: string */
    let url: string;
    /* url = URL_SERVICIOS + 'api/proceso/informe?IdEtapa='+ id_etapa +'&token=' + token; */
    url = URL_SERVICIOS + 'api/proceso/informe?IdEtapa=1&token=vVpEwleIxbtuDjvk/cn5Xg==';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers, responseType: 'arraybuffer' });
  }

}
