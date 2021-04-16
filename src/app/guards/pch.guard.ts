import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PchGuard implements CanActivate {
  
  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ){}

  canActivate() {
    
    if(this._usuarioService.acceso_pch()) {
      return true;
    }

    const redireccion = this._usuarioService.redireccion_rol();    

    this._router.navigate([redireccion]);
    return false;
    
  }
  
}
