import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { EvaluacionDocumentariaComponent } from '../../pages/evaluacion-documentaria/evaluacion-documentaria.component';
import { VerificacionFisicaComponent } from '../../pages/verificacion-fisica/verificacion-fisica.component';
import { DesguaceVehicularComponent } from '../../pages/desguace-vehicular/desguace-vehicular.component';
import { CompactacionComponent } from '../../pages/compactacion/compactacion.component';
import { EmisionCdvComponent } from '../../pages/emision-cdv/emision-cdv.component';
import { EvaluacionDocumentariaEditarComponent } from 'app/pages/evaluacion-documentaria-editar/evaluacion-documentaria-editar.component';
import { VerificacionFisicaEditarComponent } from 'app/pages/verificacion-fisica-editar/verificacion-fisica-editar.component';
import { CompactacionEditarComponent } from 'app/pages/compactacion-editar/compactacion-editar.component';
import { DesguaceVehicularEditarComponent } from 'app/pages/desguace-vehicular-editar/desguace-vehicular-editar.component';
import { EmisionCdvEditarComponent } from 'app/pages/emision-cdv-editar/emision-cdv-editar.component';
import { EliminacionFluidosComponent } from 'app/pages/eliminacion-fluidos/eliminacion-fluidos.component';
import { EliminacionFluidosEditarComponent } from '../../pages/eliminacion-fluidos-editar/eliminacion-fluidos-editar.component';
import { ProgramaChatarreoComponent } from '../../pages/programa-chatarreo/programa-chatarreo.component';
import { ChatarreoObligatorioComponent } from '../../pages/chatarreo-obligatorio/chatarreo-obligatorio.component';
import { ChatarreoObligatorioEntidadComponent } from '../../pages/chatarreo-obligatorio-entidad/chatarreo-obligatorio-entidad.component';
import { ChatarreoObligatorioAdminComponent } from 'app/pages/chatarreo-obligatorio-admin/chatarreo-obligatorio-admin.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    { path: 'evaluacion-documentaria',          component: EvaluacionDocumentariaComponent },
    { path: 'verificacion-fisica',              component: VerificacionFisicaComponent },
    { path: 'eliminacion-fluidos',              component: EliminacionFluidosComponent },
    { path: 'desguace-vehicular',               component: DesguaceVehicularComponent },
    { path: 'compactacion',                     component: CompactacionComponent },
    { path: 'emision-cdv',                      component: EmisionCdvComponent },

    { path: 'evaluacion-documentaria/:id',      component: EvaluacionDocumentariaEditarComponent },
    { path: 'verificacion-fisica/:id',          component: VerificacionFisicaEditarComponent },
    { path: 'eliminacion-fluidos/:id',          component: EliminacionFluidosEditarComponent },
    { path: 'desguace-vehicular/:id',           component: DesguaceVehicularEditarComponent },
    { path: 'compactacion/:id',                 component:  CompactacionEditarComponent},
    { path: 'emision-cdv/:id',                  component: EmisionCdvEditarComponent },

    { path: 'programa-chatarreo',               component: ProgramaChatarreoComponent },
    { path: 'chatarreo-obligatorio',            component: ChatarreoObligatorioComponent },
    { path: 'pco-entidad-promotora',            component: ChatarreoObligatorioEntidadComponent },
    { path: 'pco-admin',                        component: ChatarreoObligatorioAdminComponent }

];
