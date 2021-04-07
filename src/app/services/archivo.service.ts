import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { Subject } from 'rxjs';
import { ArchivoEtapa } from '../models/archivoEtapa.model';
import { IArchivoRequest } from '../models/iarchivoRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  archivo_evaluar: ArchivoEtapa;
  archivos_aprobados: ArchivoEtapa[] = [];
  lista_archivos_enviar = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) {
    this.cargar_archivo_evaluar();
    // this.cargar_archivos_aprobados();
   }

  obtener_archivo_etapa(etapa: number = 1, tipo_proceso: string = 'O') {
    
    let url: string;
    url = URL_SERVICIOS + 'api/etapa/archivo/tipo?idEtapa=' + etapa + '&tipoProceso=' + tipo_proceso;

    const headers = new HttpHeaders({
        'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.get(url, {headers});
  }

  obtener_archivo_evaluar(archivo_evaluar: ArchivoEtapa){
    this.limpiar_carga_archivo_evaluar();
    sessionStorage.setItem('archivo_evaluar', JSON.stringify(archivo_evaluar));
    this.cargar_archivo_evaluar();
  }

  cargar_archivo_evaluar() {
    if (sessionStorage.getItem('archivo_evaluar'))  {
      this.archivo_evaluar = JSON.parse(sessionStorage.getItem('archivo_evaluar'));
    } else {
      this.limpiar_carga_archivo_evaluar();
    }
  }  

  limpiar_carga_archivo_evaluar(){
    sessionStorage.removeItem('archivo_evaluar');
    this.archivo_evaluar = null;
  }

  obtener_archivo_aprobado(archivo_aprobado: ArchivoEtapa) {
    this.archivos_aprobados.push(archivo_aprobado);
    this.lista_archivos_enviar.next(this.archivos_aprobados);
  }

  insertar_archivo(iarchivo_request: IArchivoRequest) {
    let url: string;
    url = URL_SERVICIOS + 'api/proceso/etapa/archivo';

    const headers = new HttpHeaders({
        'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    return this._http.post(url, iarchivo_request, {headers});
  }

  cargar_archivo(token: string, documento: File){
    let url;
    url = URL_SERVICIOS + 'api/archivo?id=' + token;

    const headers = new HttpHeaders({
      'x-api-key': 'kQuxX6z9tkFt16VeYxFp94/6lJx5W2JExgVqYOgyKuo='
    });

    const cuerpo = { documento }

    return this._http.post(url, cuerpo, {headers});

  }

 

}
