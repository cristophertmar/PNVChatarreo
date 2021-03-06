import { Propietario } from './propietario.model';

export class Vehiculo {

    constructor(
        public Placa?: string,
        public Modelo?: string,
        public Marca?: string,
        public Categoria?: string,
        public NumeroChasis?: string,
        public NumeroMotor?: string,
        public VIN?: string,
        public AnoFabricacion?: string,
        public Combustible?: string,
        public Propietarios?: Propietario[],
        
        public Correlativo?: string,
        public Respuesta?: string,
        public NroChasis?: string,
        public NroMotor?: string,
        public Vin?: string,
        public Peso?: string
    ){}
}