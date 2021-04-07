export class ObservacionRequest {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public Observacion?: string,
        public Estado?: string        
    ) {}

}