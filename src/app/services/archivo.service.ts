import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { Subject } from 'rxjs';
import { ArchivoEtapa } from '../models/archivoEtapa.model';
import { IArchivoRequest } from '../models/iarchivoRequest.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  archivo_evaluar: ArchivoEtapa;
  archivos_aprobados: ArchivoEtapa[] = [];
  lista_archivos_enviar = new Subject<any>();
  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.cargar_archivo_evaluar();
    this.token = this._usuarioService.token;
   }

  obtener_archivo_etapa(etapa: number = 1, tipo_proceso: string = 'O') {
    
    let url: string;
    url = URL_SERVICIOS + 'api/etapa/archivo/tipo?idEtapa=' + etapa + '&tipoProceso=' + tipo_proceso;

    const headers = new HttpHeaders({
<<<<<<< HEAD
        'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
=======
        'x-api-key': this.token
>>>>>>> f9b66fc3be8c599705727aa0db5d10c5f42245bc
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
<<<<<<< HEAD
        'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
=======
        'x-api-key': this.token
>>>>>>> f9b66fc3be8c599705727aa0db5d10c5f42245bc
    });

    return this._http.post(url, iarchivo_request, {headers});
  }

  cargar_archivo(token: string, documento: File){
    let url;
    url = URL_SERVICIOS + 'api/archivo?id=' + token;

    const headers = new HttpHeaders({
<<<<<<< HEAD
      'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
=======
      'x-api-key': this.token
>>>>>>> f9b66fc3be8c599705727aa0db5d10c5f42245bc
    });

    const cuerpo = { documento }

    return this._http.post(url, cuerpo, {headers});

  }

 

}
