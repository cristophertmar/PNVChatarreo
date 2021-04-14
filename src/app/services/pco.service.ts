import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pco } from "../models/pco.model";
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'app/config/config';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PcoService {

  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  getQuery( query: string ) {
    const url = `${ URL_SERVICIOS }api/pco?${ query }`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }

  getPCO(entidadpromotora : string){
    return this.getQuery(`entidadidpromotora=${entidadpromotora}`);
  }

  cargarVehiculos(archivo_csv: File){
    let url;
    url = URL_SERVICIOS + 'api/pco/vehiculo';

    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    //const cuerpo = { archivo_csv }

    return this._http.post(url, archivo_csv, {headers});
  }

  insertarPco(pco : Pco) {
    console.log(pco);
    const url = `${ URL_SERVICIOS }api/pco`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.post(url, pco, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }

  aprobarPco(pco: Pco){
    pco.Estado = "A";
    pco.Motivo = "OK";

    const url = `${ URL_SERVICIOS }api/pco`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, pco, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }

  observarPco(pco: Pco){
    const url = `${ URL_SERVICIOS }api/pco`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, pco, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }
}
