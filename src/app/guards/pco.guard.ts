import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcoGuard implements CanActivate {
  
  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ){}

  canActivate() {
    
    if(this._usuarioService.acceso_pco()) {
      return true;
    }

    const redireccion = this._usuarioService.redireccion_rol();    

    this._router.navigate([redireccion]);
    return false;
    
  }
  
}
