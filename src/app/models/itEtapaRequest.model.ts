export class InitEtapaRequest {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public FechaInicio?: string,
        public Estado?: string
    ){}

}