export class ProcesoRequest{

    constructor(
        public Tipo?: string,
        public VehiculoPlaca?: string,
        public SolicitanteTipoDI?: string,
        public SolicitanteNumeroDI?: string,
        public SolicitanteNombre?: string,
        public SolicitanteCorreo?: string,
        public SolicitanteTelefono?: string,
        public PropietarioTipoDI?: string,
        public PropietarioNumeroDI?: string,
        public PropietarioNombre?: string
    ){}

}