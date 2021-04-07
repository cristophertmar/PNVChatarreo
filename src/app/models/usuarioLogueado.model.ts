import { Empresa } from './empresa.model';
import { EmpresaLocal } from './empresaLocal.model';
import { Rol } from './rol.model';

export class UsuarioLogueado{

    constructor(
        public IdUsuario?: number,
        public Tipo?: string,
        public Codigo?: string,
        public Correo?: string,
        public NombreCompleto?: string,
        public Estado?: string,
        public AccessToken?: string ,
        public Empresa?: Empresa,
        public empresaLocal?: EmpresaLocal,
        public roles?: Rol[]
    ){}

}