import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { UsuarioLogueado } from '../models/usuarioLogueado.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  loading: boolean = false;
  usuario_logueado: UsuarioLogueado;

  constructor(private _http: HttpClient) {
    this.usuario_logueado = {};
   }


  login(usuario: Usuario){
    
    let url: string;
    url = URL_SERVICIOS + 'api/usuario';

    return this._http.post(url, usuario).pipe(
      map( (resp: any) => {
        /* this.guardarStorage( resp.token, resp.data ); */
        this.usuario_logueado = resp;
        console.log(this.usuario_logueado);
        this.loading = false;
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
