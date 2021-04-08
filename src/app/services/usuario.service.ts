import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { UsuarioLogueado } from '../models/usuarioLogueado.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioLogueado;
  token: string;
  loading: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) {
    this.cargarStorage();
   }

   limpiarAcceso() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario = null;
  }

  cargarStorage() {

    if ( localStorage.getItem('token'))  {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
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

  logout() {
    this.limpiarAcceso();
    this._router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false){

    this.loading = true;
    if ( recordar ) {
      localStorage.setItem( 'nomusuario_remember', usuario.Usuario );
      localStorage.setItem( 'contrasena_remember', usuario.Contrasenia );
    } else {
      localStorage.removeItem( 'nomusuario_remember' );
      localStorage.removeItem( 'contrasena_remember' );
    }
    
    let url: string;
    url = URL_SERVICIOS + 'api/usuario';

    return this._http.post(url, usuario).pipe(
      map( (resp: UsuarioLogueado) => {
        this.guardarStorage( resp.AccessToken, resp);
        this.usuario = resp;
        console.log(this.usuario);
        this.loading = false;
        this._router.navigate(['/']);
        return true;
      }),
      catchError(err => {
        /* console.log(err.error); */
        /* console.log(err.status); */
        /* console.log(err.error.message); */
        this.loading = false;
        Swal.fire({
          //text: err.error.message,
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