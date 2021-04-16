import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadousu'
})
export class EstadousuPipe implements PipeTransform {

  transform(value: string): string {
    
    value = value.toUpperCase();
    var retorno : string;

    if ( value === "N" ) {
      retorno = "No Asignado";
    } else if ( value === "A" ) {
      retorno = "Asignado";
    } else {
      retorno = "";
    }

    return retorno;
  }

}
