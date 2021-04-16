import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadochk'
})
export class EstadochkPipe implements PipeTransform {

  transform(value: string): string {
    
    value = value.toUpperCase();
    var retorno : string;

    if ( value === "A" ) {
      retorno = "Activo";
    } else if ( value === "I" ) {
      retorno = "Inactivo";
    } else {
      retorno = "";
    }

    return retorno;
  }

}
