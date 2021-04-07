import { Checklist } from './checklist.model';

export class ProcesoEtapa {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public EntidadIdUsuario?: string,
        public FechaInicio?: string,
        public FechaFin?: string,
        public FechaObservacion?: string,
        public Observacion?: string,
        public VehiculoPeso?: number,
        public ChatarraPeso?: string,
        public Estado?: string,
        public Checklist?: Checklist[],
        public Archivos?: []
    ){}

}