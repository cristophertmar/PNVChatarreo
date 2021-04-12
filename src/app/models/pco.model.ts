export class Pco{

    constructor(
        public Correlativo?          : string,
        public Token?              : string,
        public TipoPCO?            : string,
        public FechaInicio?        : Date,
        public FechaFin?           : Date,
        public Cantidad?           : number,
        public Estado?             : string,
        public EntidadIdPromotora? : number,
        public Motivo?             : string,
        public IdExpediente?       : string,
        public NombreExpediente?   : string,
        public IdSustento?         : string,
        public NombreSustento?     : string
    ){}
}