import { ArchivoEtapa } from './archivoEtapa.model';

export class FinEtapaRequest {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public ChatarraPeso?: number,
        public VehiculoPeso?: number,
        public FechaInicio?: string,
        public FechaFin?: string,
        public Estado?: string,
        public Checklist?: ArchivoEtapa[]
    ){}

}