import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { FinEtapaRequest } from 'app/models/fEtapaRequest.model';
import { ObservacionRequest } from 'app/models/observacionRequest.model';
import { InitEtapaRequest } from '../models/itEtapaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProcesoEtapaService {

  constructor(
    private _http: HttpClient
  ) { }

  iniciar_etapa(etapa_request: InitEtapaRequest) {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.put(url, etapa_request, { headers });

  }

  finalizar_etapa(festapa_request: FinEtapaRequest){
    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.put(url, festapa_request, { headers });
  }


  observar_etapa(observacion_request: ObservacionRequest) {

    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa';

    const headers = new HttpHeaders({
      'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.put(url, observacion_request, { headers });

  }

  descargar_informe(id_etapa: number, token: string) {
    let url: string;
    url = URL_SERVICIOS + 'api/proceso/informe?IdEtapa='+ id_etapa +'&token=' + token;

    const headers = new HttpHeaders({
      'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.get(url, { headers, responseType: 'arraybuffer' });
  }

}
