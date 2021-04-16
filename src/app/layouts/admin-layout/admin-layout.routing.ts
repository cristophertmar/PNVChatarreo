import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

// Etapas
import { EtapaComponent } from '../../pages/etapa/etapa.component';

import { EvaluacionDocumentariaEditarComponent } from 'app/pages/evaluacion-documentaria-editar/evaluacion-documentaria-editar.component';
import { VerificacionFisicaEditarComponent } from 'app/pages/verificacion-fisica-editar/verificacion-fisica-editar.component';
import { EliminacionFluidosEditarComponent } from '../../pages/eliminacion-fluidos-editar/eliminacion-fluidos-editar.component';
import { CompactacionEditarComponent } from 'app/pages/compactacion-editar/compactacion-editar.component';
import { DesguaceVehicularEditarComponent } from 'app/pages/desguace-vehicular-editar/desguace-vehicular-editar.component';
import { EmisionCdvEditarComponent } from 'app/pages/emision-cdv-editar/emision-cdv-editar.component';

// PCO PCH

import { ProgramaChatarreoComponent } from '../../pages/programa-chatarreo/programa-chatarreo.component';
import { ChatarreoObligatorioComponent } from '../../pages/chatarreo-obligatorio/chatarreo-obligatorio.component';

// Mantenimiento
import { UsuarioComponent } from 'app/pages/mantenimiento/usuario/usuario.component';
import { EntidadComponent } from 'app/pages/mantenimiento/entidad/entidad.component';
import { DocumentoComponent } from 'app/pages/mantenimiento/documento/documento.component';
import { ChecklistComponent } from 'app/pages/mantenimiento/checklist/checklist.component';
import { EtapasGuard } from '../../guards/etapas.guard';
import { MantenimientoGuard } from 'app/guards/mantenimiento.guard';
import { PcoGuard } from '../../guards/pco.guard';
import { PchGuard } from '../../guards/pch.guard';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    { path: 'etapa/:nom_etapa',                    component: EtapaComponent, canActivate: [EtapasGuard] },

    { path: 'evaluacion-documentaria/:token',      component: EvaluacionDocumentariaEditarComponent, canActivate: [EtapasGuard] },
    { path: 'verificacion-fisica/:token',          component: VerificacionFisicaEditarComponent, canActivate: [EtapasGuard] },
    { path: 'eliminacion-fluidos/:token',          component: EliminacionFluidosEditarComponent, canActivate: [EtapasGuard] },
    { path: 'desguace-vehicular/:token',           component: DesguaceVehicularEditarComponent, canActivate: [EtapasGuard] },
    { path: 'compactacion/:token',                 component:  CompactacionEditarComponent, canActivate: [EtapasGuard] },
    { path: 'emision-cdv/:token',                  component: EmisionCdvEditarComponent , canActivate: [EtapasGuard]},

    { path: 'programa-chatarreo',                  component: ProgramaChatarreoComponent, canActivate: [PchGuard] },
    { path: 'chatarreo-obligatorio',               component: ChatarreoObligatorioComponent, canActivate: [PcoGuard] },

    { path: 'mantenimiento/usuario',               component: UsuarioComponent, canActivate: [MantenimientoGuard] },
    { path: 'mantenimiento/entidad-promotora',     component: EntidadComponent, canActivate: [MantenimientoGuard] },
    { path: 'mantenimiento/tipo-documentos',       component: DocumentoComponent, canActivate: [MantenimientoGuard] },
    { path: 'mantenimiento/checklist',             component: ChecklistComponent, canActivate: [MantenimientoGuard] }

];
