import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadopch'
})
export class EstadopchPipe implements PipeTransform {

  transform(value: string): string {
    
    value = value.toUpperCase();
    var retorno : string;

    if ( value === "N" ) {
      retorno = "Nuevo";
    } else if ( value === "A" ) {
      retorno = "Aprobado";
    } else if ( value === "O" ) {
      retorno = "Observado";
    } else if ( value === "R" ) {
      retorno = "Rechazado";
    } else {
      retorno = "";
    }

    return retorno;
  }

}
