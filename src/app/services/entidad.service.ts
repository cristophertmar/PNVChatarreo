import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioService } from './usuario.service';

import { EntidadRequest } from "app/models/entidadRequest.model";

import { URL_SERVICIOS } from 'app/config/config';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  getQuery( query: string ) {
    const url = `${ URL_SERVICIOS }api/entidad?${ query }`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }

  getEntidadesPorTipo(tipo: string){
      return this.getQuery(`tipo=${tipo}`);
  }

  insertarEntidad(entidad: EntidadRequest){
    const url = `${ URL_SERVICIOS }api/entidad`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.post(url, entidad, { headers });
  }

  modificarEntidad(entidad: EntidadRequest  ){
    const url = `${ URL_SERVICIOS }api/entidad`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, entidad, { headers });
  }
}