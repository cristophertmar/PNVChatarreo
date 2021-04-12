export class Pch{

    constructor(
        public CodigoPCH?          : string,
        public Token?              : string,
        public TipoPCH?            : string,
        public FechaInicio?        : Date,
        public FechaFin?           : Date,
        public CapacidadVehicular? : number,
        public CapacidadReal?      : number,
        public Estado?             : string,
        public EntidadIdPromotora? : number,
        public Motivo?             : string,
        public IdExpediente?       : string,
        public NombreExpediente?   : string,
        public IdSustento?         : string,
        public NombreSustento?     : string
    ){}
}