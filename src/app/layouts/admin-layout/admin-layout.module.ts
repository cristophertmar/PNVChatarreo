import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


// Material Angular
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EvaluacionDocumentariaEditarComponent } from 'app/pages/evaluacion-documentaria-editar/evaluacion-documentaria-editar.component';
import { VerificacionFisicaEditarComponent } from 'app/pages/verificacion-fisica-editar/verificacion-fisica-editar.component';
import { CompactacionEditarComponent } from 'app/pages/compactacion-editar/compactacion-editar.component';
import { DesguaceVehicularEditarComponent } from 'app/pages/desguace-vehicular-editar/desguace-vehicular-editar.component';
import { EmisionCdvEditarComponent } from 'app/pages/emision-cdv-editar/emision-cdv-editar.component';
import { EliminacionFluidosEditarComponent } from 'app/pages/eliminacion-fluidos-editar/eliminacion-fluidos-editar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';

// Galery
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { ProgramaChatarreoComponent } from '../../pages/programa-chatarreo/programa-chatarreo.component';
import { ChatarreoObligatorioComponent } from '../../pages/chatarreo-obligatorio/chatarreo-obligatorio.component';
import { EtapaComponent } from '../../pages/etapa/etapa.component';

//Pipes
import { EstadopchPipe } from "../../pipes/estadopch.pipe";

// Mantenimiento
import { UsuarioComponent } from '../../pages/mantenimiento/usuario/usuario.component';
import { EntidadComponent } from '../../pages/mantenimiento/entidad/entidad.component';
import { DocumentoComponent } from '../../pages/mantenimiento/documento/documento.component';
import { ChecklistComponent } from '../../pages/mantenimiento/checklist/checklist.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatTooltipModule,
    GalleryModule,
    LightboxModule,
    MatTabsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    EvaluacionDocumentariaEditarComponent,
    VerificacionFisicaEditarComponent,
    CompactacionEditarComponent,
    DesguaceVehicularEditarComponent,
    EmisionCdvEditarComponent,
    EliminacionFluidosEditarComponent,
    ProgramaChatarreoComponent,
    ChatarreoObligatorioComponent,
    EtapaComponent,
    EstadopchPipe,
    UsuarioComponent,
    EntidadComponent,
    DocumentoComponent,
    ChecklistComponent
  ]
})

export class AdminLayoutModule {}
