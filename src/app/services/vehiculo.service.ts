import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  loading: Boolean;
  token: string;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }
  
  obtener_vehiculo(placa: string) {
    
    let url: string;
    url = URL_SERVICIOS + 'api/vehiculo?placa=' + placa;

    const headers = new HttpHeaders({
        'x-api-key': this.token
    });

    return this._http.get(url, {headers}).pipe(
      map( (resp: any) => {
        this.loading = false;
        return resp;
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
