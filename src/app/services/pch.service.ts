import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pch } from "../models/pch.model";
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'app/config/config';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PchService {

  token: string;
  pch_seleccionado = new Subject<Pch>();

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  enviar_pch_seleccionado(pch: Pch) {
    this.pch_seleccionado.next(pch);
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

  getPCHActive(estado: string){
    return this.getQuery(`estado=${estado}`);
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
