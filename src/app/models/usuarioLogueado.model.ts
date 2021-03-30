import { Empresa } from './empresa.model';
import { EmpresaLocal } from './empresaLocal.model';
import { Rol } from './rol.model';

export class UsuarioLogueado{

    constructor(
        public idUsuario?: number,
        public codigo?: string,
        public correo?: string,
        public nombreCompleto?: string,
        public accessToken?: string ,
        public empresa?: Empresa,
        public empresaLocal?: EmpresaLocal,
        public roles?: Rol[]
    ){}

}