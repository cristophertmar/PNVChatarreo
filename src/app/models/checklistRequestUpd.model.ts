export class ChecklistRequestUpd {

    constructor(
        public IdEtapa?: number,
        public IdChecklist?: number,
        public Descripcion?: string,
        public Estado?: string
    ) {}

}