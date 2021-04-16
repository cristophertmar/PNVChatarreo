import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etapachk'
})
export class EtapachkPipe implements PipeTransform {

  transform(value: number): string {
    var retorno : string;

    if ( value === 1 ) {
      retorno = "Evaluación Documentaria";
    } else if ( value === 2 ) {
      retorno = "Verificación Física";
    } else if ( value === 3 ) {
      retorno = "Eliminación de Fluidos";
    } else if ( value === 4 ) {
      retorno = "Desguace Vehicular";
    } else if ( value === 5 ) {
      retorno = "Compactación";
    } else if ( value === 6 ) {
      retorno = "Emisión del CDV";
    } else {
      retorno = "";
    }

    return retorno;
  }

}
