import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioService } from './usuario.service';

import { Checklist } from "app/models/checklist.model";
import { ChecklistRequestUpd } from "app/models/checklistRequestUpd.model";
import { ChecklistRequestDel } from "app/models/checklistRequestDel.model";

import { URL_SERVICIOS } from 'app/config/config';

@Injectable({
    providedIn: 'root'
})

export class ChecklistService {
    token: string;

    constructor(
        private _http: HttpClient,
        private _usuarioService: UsuarioService
    ) {
        this.token = this._usuarioService.token;
    }

    getChecklist( idEtapa: number ) {
      const url = `${ URL_SERVICIOS }api/checklList?IdEtapa=${ idEtapa }`;
      const headers = new HttpHeaders({
        'x-api-key': this.token
      });
  
      return this._http.get(url, { headers });
    }

    insertarChecklist(checklist: Checklist){
      const url = `${ URL_SERVICIOS }api/checklList`;
      const headers = new HttpHeaders({
        'x-api-key': this.token
      });
  
      return this._http.post(url, checklist, { headers });
    }
  
    modificarCheklist(clUpd: ChecklistRequestUpd){
      const url = `${ URL_SERVICIOS }api/checklList`;
      const headers = new HttpHeaders({
        'x-api-key': this.token
      });
  
      return this._http.put(url, clUpd, { headers });
    }
  
    eliminarCheklist(clDel: ChecklistRequestDel){
      const url = `${ URL_SERVICIOS }api/checklList`;
      const headers = new HttpHeaders({
        'x-api-key': this.token
      });
  
      return this._http.put(url, clDel, { headers });
    }
}