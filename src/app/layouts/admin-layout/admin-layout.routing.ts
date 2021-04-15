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
import { ChatarreoObligatorioEntidadComponent } from '../../pages/chatarreo-obligatorio-entidad/chatarreo-obligatorio-entidad.component';
import { ChatarreoObligatorioAdminComponent } from 'app/pages/chatarreo-obligatorio-admin/chatarreo-obligatorio-admin.component';
import { UsuarioComponent } from '../../pages/mantenimiento/usuario/usuario.component';
import { EntidadComponent } from '../../pages/mantenimiento/entidad/entidad.component';
import { DocumentoComponent } from '../../pages/mantenimiento/documento/documento.component';
import { ChecklistComponent } from '../../pages/mantenimiento/checklist/checklist.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    { path: 'etapa/:nom_etapa',                    component: EtapaComponent },

    { path: 'evaluacion-documentaria/:token',      component: EvaluacionDocumentariaEditarComponent },
    { path: 'verificacion-fisica/:token',          component: VerificacionFisicaEditarComponent },
    { path: 'eliminacion-fluidos/:token',          component: EliminacionFluidosEditarComponent },
    { path: 'desguace-vehicular/:token',           component: DesguaceVehicularEditarComponent },
    { path: 'compactacion/:token',                 component:  CompactacionEditarComponent},
    { path: 'emision-cdv/:token',                  component: EmisionCdvEditarComponent },

    { path: 'programa-chatarreo',                  component: ProgramaChatarreoComponent },
    { path: 'chatarreo-obligatorio',               component: ChatarreoObligatorioComponent },
    { path: 'pco-entidad-promotora',               component: ChatarreoObligatorioEntidadComponent },
    { path: 'pco-admin',                           component: ChatarreoObligatorioAdminComponent },

    { path: 'mantenimiento/usuario',               component: UsuarioComponent },
    { path: 'mantenimiento/entidad-promotora',     component: EntidadComponent },
    { path: 'mantenimiento/tipo-documentos',       component: DocumentoComponent },
    { path: 'mantenimiento/checklist',             component: ChecklistComponent }

];
