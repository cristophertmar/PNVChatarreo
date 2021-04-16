import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoent'
})
export class TipoEntPipe implements PipeTransform {

  transform(value: string): string {
    
    value = value.toUpperCase();
    var retorno : string;

    if ( value === "H" ) {
      retorno = "Chatarreo";
    } else if ( value === "O" ) {
      retorno = "Obligatorio";
    } else if ( value === "L" ) {
        retorno = "Local";
    } else {
      retorno = "";
    }

    return retorno;
  }

}
