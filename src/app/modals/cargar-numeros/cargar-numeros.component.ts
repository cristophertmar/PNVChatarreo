import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MantenimientoPcoComponent } from '../../modals/mantenimiento-pco/mantenimiento-pco.component';
import { MatDialog } from '@angular/material/dialog';

import { PcoService } from "../../services/pco.service";

import { Pco } from "../../models/pco.model";
import { CargaVehiculo } from "../../models/cargaVehiculo.model";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-numeros',
  templateUrl: './cargar-numeros.component.html',
  styles: [
  ]
})
export class CargarNumerosComponent implements OnInit {

  @ViewChild('btn_select_doc') btn_select_doc: ElementRef<HTMLElement>;

  archivoCSV: File;
  carga_vehiculo: CargaVehiculo;
  nombrecsv: string;
  respuesta?: string;
  form_csv: FormGroup;
  tabIndex: number = 0;
  peso_maximo = 200000; // 200kb

  constructor(
    public _dialog: MatDialog,
    private _pcoService : PcoService
  ) { 
    this.nombrecsv = "";
    this.carga_vehiculo = new CargaVehiculo();
  }

  ngOnInit(): void {
    this.form_csv = new FormGroup({
      nombrecsv: new FormControl( )
    });
  }

  pulsarCambio() {
    this.btn_select_doc.nativeElement.click();
  }

  // archivo: File
  seleccion_archivo( archivo: File ){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    this.archivoCSV = archivo;

    if(this.archivoCSV.name.toUpperCase().endsWith("CSV")){
      if(this.archivoCSV.size <= this.peso_maximo) {

        this._pcoService.cargarVehiculos(this.archivoCSV)
          .subscribe((data : any) => {
            const tabCount = 2;
            const tmpData: CargaVehiculo = data;
            
            this.tabIndex = (this.tabIndex + 1) % tabCount;
            this.nombrecsv = this.archivoCSV.name;
            this.respuesta = null;

            this.carga_vehiculo.Vehiculos = [];
            this.carga_vehiculo.Token = tmpData.Token;
            
            for(let i = 0; i < tmpData.Vehiculos.length; i++) {
              /*if(i===1 || i === 3){
                tmpData.Vehiculos[i].Respuesta = "La placa " + tmpData.Vehiculos[i].Placa + " ya está procesada";
              }*/

              if(tmpData.Vehiculos[i].Respuesta){
                if(this.respuesta){
                  this.respuesta = this.respuesta + "\n" + tmpData.Vehiculos[i].Respuesta;
                } else {
                  this.respuesta = tmpData.Vehiculos[i].Respuesta;
                }
              } else {
                this.carga_vehiculo.Vehiculos.push(tmpData.Vehiculos[i]);
              }
            }

            if(this.respuesta){
              this.respuesta = "Los siguientes vehículos no se procesaron:\n" + this.respuesta;
            }

            Swal.close();
          },
          (error) => {
            console.log(error);
            
            Swal.close();

            Swal.fire({
              text: 'El archivo csv no se pudo cargar',
              width: 350,
              padding: 15,
              timer: 2000,
              allowOutsideClick: false,
              showConfirmButton: false,
              icon: 'error'
            });

            return;
          }
        );
        /*Swal.fire({
          text: 'Adjuntado exitosamente',
          width: 350,
          padding: 15,
          timer: 2000,
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'success'
        });*/

        
        return;

      } else {
        Swal.close();

        Swal.fire({
          text: 'El archivo excede los 200kb',
          width: 350,
          padding: 15,
          timer: 2000,
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'error'
        });
        return;
      }
    } else {
      Swal.close();

      Swal.fire({
        text: 'Sólo se permiten archivos CSV',
        width: 350,
        padding: 15,
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'error'
      });

      return;
    }
  }

  mantenimientoPCO() {
    const dialogRef = this._dialog.open(MantenimientoPcoComponent, {
      disableClose: true
    });

    var pco: Pco = new Pco();
    pco.Token = this.carga_vehiculo.Token;
    pco.Correlativo = "Autogenerado";
    pco.Estado = "N";
    
    dialogRef.componentInstance.pco = pco;
    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }
}
