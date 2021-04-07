import { TipoArchivo } from './tipoArchivo.model';
import { ProcesoEtapa } from './procesoEtapa.model';

export class Etapa {

    constructor(
        public IdEtapa?: number,
        public Orden?: number,
        public Descripcion?: string,
        public IdEtapaPredecesora?: number,
        public TipoArchivos?: TipoArchivo[]
    ){}

}