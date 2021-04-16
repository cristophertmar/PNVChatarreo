export class UsuarioRequest{

    constructor(
        public Tipo?: string,
        public IdUsuario?: number,
        public IdEntidad?: number,
        public Estado?: string
    ){}

}