import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/config/config';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  loading: Boolean;

  constructor(private _http: HttpClient) { }
  
  obtener_vehiculo(placa: string) {
    
    let url: string;
    url = URL_SERVICIOS + 'api/vehiculo?placa=' + placa;

    const headers = new HttpHeaders({
        'x-api-key': '4gPdECZxTIK5DgcZ2X3dUENd91Wif/DhhLu3DuOwT8I='
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
