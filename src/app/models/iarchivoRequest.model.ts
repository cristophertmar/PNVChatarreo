export class IArchivoRequest {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public IdTipoArchivo?: number,
        public Nombre?: string
    ) {}

}