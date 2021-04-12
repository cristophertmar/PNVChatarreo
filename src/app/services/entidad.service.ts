import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

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

      console.log(url);
  
      return this._http.get(url, { headers });
    }

    getEntidadesPorTipo(tipo: string){
        console.log(tipo);
        return this.getQuery(`tipo=${tipo}`);
    }
}