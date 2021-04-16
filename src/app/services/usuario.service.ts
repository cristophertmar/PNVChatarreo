import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { URL_SERVICIOS, ID_ROL } from 'app/config/config';

import { Usuario } from '../models/usuario.model';
import { UsuarioLogueado } from '../models/usuarioLogueado.model';
import { UsuarioRequest } from '../models/usuarioRequest.model';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioLogueado;
  token: string;
  loading: boolean;
  id_rol: number;

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) {
    this.loading = false;
    this.cargarStorage();
  }

  esta_logueado() {
    return this.token? true : false;
  }

  acceso_etapas() {        
    
    let acceso: boolean =  false;

    switch (this.id_rol) {
      case 1269: // Administrador ECH
        acceso = true;
        break;
      case 1272: // Director ECH
        acceso = true;
        break;
      case 1274: // Consulta MTC
        acceso = true;
        break;
      case 1275: // Administrador Sistema
        acceso = true;
        break;
      default:
        acceso = false;
        break;
    }

    return acceso;

  }

  acceso_pch() {    
    
    let acceso: boolean =  false;

    switch (this.id_rol) {
      case 1270: // Entidad Promotora
        acceso = true;
        break;
      case 1273: // Aprobador MTC
        acceso = true;
        break;
      case 1274: // Consulta MTC
        acceso = true;
        break;
      case 1275: // Administrador Sistema
        acceso = true;
        break;
      default:
        acceso = false;
        break;
    }

    return acceso;

  }

  acceso_pco() {    
    
    let acceso: boolean =  false;

    switch (this.id_rol) {
      case 1271: // Autoridad PCO
        acceso = true;
        break;
      case 1273: // Aprobador MTC
        acceso = true;
        break;
      case 1274: // Consulta MTC
        acceso = true;
        break;
      case 1275: // Administrador Sistema
        acceso = true;
        break;
      default:
        acceso = false;
        break;
    }

    return acceso;

  }

  acceso_mantenimiento() {    
    
    let acceso: boolean =  false;

    switch (this.id_rol) {
      case 1275: // Administrador Sistema
        acceso = true;
        break;
      default:
        acceso = false;
        break;
    }

    return acceso;

  }

  redireccion_rol() {

    let redireccion: string = '';

    switch (this.usuario.Roles[0].IdRol) {
      case 1269: // Administrador ECH
      redireccion = '/etapa/evaluacion-documentaria'
      break;
      case 1270: // Entidad Promotora PCH
      redireccion = '/programa-chatarreo'
      break;
      case 1271: // Autoridad PCO
      redireccion = '/chatarreo-obligatorio'
      break;
      case 1272: // Director ECH
      redireccion = '/etapa/evaluacion-documentaria'
      break;
      case 1273: // Aprobador MTC
      redireccion = '/programa-chatarreo'
      break;
      case 1274: // Consulta MTC
      redireccion = '/etapa/evaluacion-documentaria'
      break;
      case 1275: // Administrador del sistema
      redireccion = '/etapa/evaluacion-documentaria'
      break;    
      default:
      redireccion = '/login'
      break;
    }

    return redireccion;

  }

  limpiarAcceso() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario = null;
  }

  cargarStorage() {

    if (localStorage.getItem('token'))  {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.id_rol = this.usuario.Roles[0].IdRol;
    } else {
      this.limpiarAcceso();
    }
  }

  guardarStorage( token: string, usuario: UsuarioLogueado ) {

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  cerrar_sesion() {
    this.limpiarAcceso();
    this._router.navigate(['/login']);
  }

  getMantenimientoQuery( query: string ) {
    const url = `${ URL_SERVICIOS }api/mantenimiento/usuario?${ query }`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.get(url, { headers });
  }

  getUsuarios(tipo : string, estado: string){
    return this.getMantenimientoQuery( `tipo=${tipo}&estado=${estado}` );
  }

  modificarUsuario(usu: UsuarioRequest){
    const url = `${ URL_SERVICIOS }api/mantenimiento/usuario`;
    const headers = new HttpHeaders({
      'x-api-key': this.token
    });

    return this._http.put(url, usu, { headers });
  }

  login(usuario: Usuario, recordar: boolean = false){

    this.loading = true;
    if (recordar) {
      localStorage.setItem( 'nomusuario_recuerda', usuario.Usuario );
      localStorage.setItem( 'contrasena_recuerda', usuario.Contrasenia );
    } else {
      localStorage.removeItem( 'nomusuario_recuerda' );
      localStorage.removeItem( 'contrasena_recuerda' );
    }
    
    let url: string;
    url = `${ URL_SERVICIOS }api/usuario?usuario=${ usuario.Usuario }&contrasenia=${ usuario.Contrasenia }&idPerfilSso=${ ID_ROL }`;

    return this._http.get(url).pipe(
      map( (resp: UsuarioLogueado) => {
        this.guardarStorage( resp.AccessToken, resp);
        this.usuario = resp;
        console.log(this.usuario);
        this.id_rol = this.usuario.Roles[0].IdRol;
        this.loading = false;
        const url_redirecciona = this.redireccion_rol();
        this._router.navigate([url_redirecciona]);
        return true;
      }),
      catchError(err => {
        this.loading = false;
        Swal.fire({
          text: err.error,
          width: 350,
          padding: 15,
          timer: 2000,
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'error'
        });

        return throwError(err);

      })
    );
  }

}
