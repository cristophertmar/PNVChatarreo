import { Vehiculo } from './vehiculo.model';

export class CargaVehiculo {

    constructor(
        public Token?: string,
        public Correlativo?: string,
        public FechaInicio?: string,
        public FechaFin?: string,
        public Cantidad?: number,
        public IdExpediente?: string,
        public NombreExpediente?: string,
        public IdSustento?: string,
        public NombreSustento?: string,
        public EntidadIdPromotora?: number,
        public Motivo?: string,
        public Estado?: string,
        public Vehiculos?: Vehiculo[]
    ){}

}