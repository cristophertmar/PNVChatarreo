import { Etapa } from './etapa.model';
import { ProcesoEtapa } from './procesoEtapa.model';

export class ProcesoResponse{

    constructor(
        public IdProceso?: number,
        public Correlativo?: string,
        public Tipo?: string,
        public FechaInicio?: string,
        public FechaFin?: string,
        public SolicitanteTipoDI?: string,
        public SolicitanteNumeroDI?: string,
        public SolicitanteNombre?: string,
        public SolicitanteCorreo?: string,
        public SolicitanteTelefono?: string,
        public PropietarioTipoDI?: string,
        public PropietarioNumeroDI?: string,
        public PropietarioNombre?: string,
        public VehiculoPlaca?: string,
        public VehiculoModelo?: string,
        public VehiculoMarca?: string,
        public VehiculoCategoria?: string,
        public VehiculoNroChasis?: string,
        public VehiculoNroMotor?: string,
        public VehiculoVIN?: string,
        public VehiculoAnoFabricacion?: string,
        public VehiculoCombustible?: string,
        public VehiculoPeso?: string,
        public EntidadIdEmpresa?: number,
        public EntidadIdSucursal?: number,
        public EntidadIdPromotora?: number,
        public IdEtapaActiva?: number,
        public Token?: string,
        public Etapa?: Etapa,
        public ProcesoEtapa?: ProcesoEtapa
    ){}

}