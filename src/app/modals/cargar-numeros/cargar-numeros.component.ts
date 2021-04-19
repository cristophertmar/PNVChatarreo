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
  @ViewChild('btncerrarcn') btncerrarcn: ElementRef<HTMLElement>;
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
            this.tabIndex = (this.tabIndex + 1) % tabCount;
            this.carga_vehiculo = data;
            
            //console.log(data);

            /*for(let i = 0; i < this.carga_vehiculo.Vehiculos.length; i++) {
                if(i === 1 || i === 3 || i === 5 || i === 7 || i === 9){
                  this.carga_vehiculo.Vehiculos[i].Respuesta = "No se encontró en SUNARP";
                }
            }*/

            Swal.close();
          },
          (error) => {
            //console.log(error);
            
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
      let cerrar: string = localStorage.getItem("cerrarMantPCO");
      if(cerrar === "1"){
        this.cerrar_modal(true);
      }
    });
  }

  cerrar_modal(exito: boolean){
    localStorage.setItem("cerrarCN","1");

    if (!exito){
      localStorage.setItem("cerrarCN","2");
    }

    this.btncerrarcn.nativeElement.click();
  }
}
