export class ArchivoEtapa{

    constructor(
        public IdEtapa?: number,
        public IdTipoArchivo?: number,
        public Subtipo?: string,
        public Descripcion?: string,
        public Obligatorio?: string,
        public Multiple?: string,
        public Extension?: string,
        public ValidaRepresentante?: string,
        public archivo_adjunto?: File,
        public Token?: string
    ){}

}