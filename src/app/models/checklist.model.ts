export class Checklist {

    constructor(
        public IdProceso?: number,
        public IdEtapa?: number,
        public IdChecklist?: number,
        public Orden?: number,
        public Descripcion?: string,
        public Estado?: string,
        public Token?: string,
        public Cumple?: string
    ) {}

}