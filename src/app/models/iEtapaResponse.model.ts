export class InitEtapaResponse {

    constructor(
        public IdEtapa?: number,
        public Orden?: number,
        public Descripcion?: string,
        public IdEtapaPredecesora?: number,
        public TipoArchivos?: any,
    ){}

}