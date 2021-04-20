import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ObservacionComponent } from './modals/observacion/observacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AprobarComponent } from './modals/aprobar/aprobar.component';
import { ObservarComponent } from './modals/observar/observar.component';
import { AprobarVerificacionFisicaComponent } from './modals/aprobar-verificacion-fisica/aprobar-verificacion-fisica.component';
import { MantenimientoPchComponent } from './modals/mantenimiento-pch/mantenimiento-pch.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { CargarNumerosComponent } from './modals/cargar-numeros/cargar-numeros.component';
import { MantenimientoPcoComponent } from './modals/mantenimiento-pco/mantenimiento-pco.component';
import { ArchivoAdjuntarComponent } from './modals/archivo-adjuntar/archivo-adjuntar.component';

import { Nl2brPipe } from './pipes/nl2br.pipe';
import { MantenimientoUsuarioComponent } from './modals/mantenimiento-usuario/mantenimiento-usuario.component';
import { MantenimientoEntidadComponent } from './modals/mantenimiento-entidad/mantenimiento-entidad.component';
import { MantenimientoChecklistComponent } from './modals/mantenimiento-checklist/mantenimiento-checklist.component';
import { SeleccionPchComponent } from './modals/seleccion-pch/seleccion-pch.component';

// Zona Horaria
import { registerLocaleData } from '@angular/common';
import localesPE from '@angular/common/locales/es-PE';
registerLocaleData(localesPE, 'es-Pe');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,    
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ObservacionComponent,
    AprobarComponent,
    ObservarComponent,
    AprobarVerificacionFisicaComponent,
    MantenimientoPchComponent,
    CargarNumerosComponent,
    MantenimientoPcoComponent,
    ArchivoAdjuntarComponent,
    Nl2brPipe,
    MantenimientoUsuarioComponent,
    MantenimientoEntidadComponent,
    MantenimientoChecklistComponent,
    SeleccionPchComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Pe' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
