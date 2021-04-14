import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pch } from "../models/pch.model";
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'app/config/config';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PchService {

  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  getQuery( query: string ) {
    const url = `${ URL_SERVICIOS }api/pch?${ query }`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }

  getPCH(estado : string, entidadpromotora : string){
    return this.getQuery(`estado=${estado}&entidadidpromotora=${entidadpromotora}`);
  }

  getSeleccionar(codigo: string){
    return this.getQuery(`CodigoPCH=${codigo}`);
  }

  insertarPch(pch : Pch) {
    const url = `${ URL_SERVICIOS }api/pch`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.post(url, pch, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }

  aprobarPch(pch: Pch){
    pch.Estado = "A";
    pch.Motivo = "OK";

    const url = `${ URL_SERVICIOS }api/pch`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, pch, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }

  observarPch(pch: Pch){
    const url = `${ URL_SERVICIOS }api/pch`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, pch, { headers }) 
      .pipe(
        map( resp => {
          return resp;
        })
      );
  }
}
