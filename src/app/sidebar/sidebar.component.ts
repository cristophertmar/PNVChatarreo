import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_ETAPAS: RouteInfo[] = [
  { path: '/etapa/evaluacion-documentaria', title: 'Eval. Documentaria',  icon:'pe-7s-note2', class: '' },
  { path: '/etapa/verificacion-fisica', title: 'Verificación Física',  icon:'pe-7s-look', class: '' },
  { path: '/etapa/eliminacion-fluidos', title: 'Eliminación Fluidos',  icon:'pe-7s-paint-bucket', class: '' },
  { path: '/etapa/desguace-vehicular', title: 'Desguace Vehicular',  icon:'pe-7s-car', class: '' },
  { path: '/etapa/compactacion', title: 'Compactación',  icon:'pe-7s-hammer', class: '' },
  { path: '/etapa/emision-cdv', title: 'Emisión del CDV',  icon:'pe-7s-copy-file', class: '' }
]

export const ROUTES_PCH: RouteInfo[] = [
  { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-box2', class: '' }
]

export const ROUTES_PCO: RouteInfo[] = [
  { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-attention', class: '' }
]

export const ROUTES_PCH_PCO: RouteInfo[] = [
  { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-box2', class: '' },
  { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-attention', class: '' }
]

export const ROUTES_CONSULTA: RouteInfo[] = [
  { path: '/etapa/evaluacion-documentaria', title: 'Eval. Documentaria',  icon:'pe-7s-note2', class: '' },
  { path: '/etapa/verificacion-fisica', title: 'Verificación Física',  icon:'pe-7s-look', class: '' },
  { path: '/etapa/eliminacion-fluidos', title: 'Eliminación Fluidos',  icon:'pe-7s-paint-bucket', class: '' },
  { path: '/etapa/desguace-vehicular', title: 'Desguace Vehicular',  icon:'pe-7s-car', class: '' },
  { path: '/etapa/compactacion', title: 'Compactación',  icon:'pe-7s-hammer', class: '' },
  { path: '/etapa/emision-cdv', title: 'Emisión del CDV',  icon:'pe-7s-copy-file', class: '' },
  { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-box2', class: '' },
  { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-attention', class: '' }
]

export const ROUTES_TODOS: RouteInfo[] = [
  { path: '/etapa/evaluacion-documentaria', title: 'Eval. Documentaria',  icon:'pe-7s-note2', class: '' },
  { path: '/etapa/verificacion-fisica', title: 'Verificación Física',  icon:'pe-7s-look', class: '' },
  { path: '/etapa/eliminacion-fluidos', title: 'Eliminación Fluidos',  icon:'pe-7s-paint-bucket', class: '' },
  { path: '/etapa/desguace-vehicular', title: 'Desguace Vehicular',  icon:'pe-7s-car', class: '' },
  { path: '/etapa/compactacion', title: 'Compactación',  icon:'pe-7s-hammer', class: '' },
  { path: '/etapa/emision-cdv', title: 'Emisión del CDV',  icon:'pe-7s-copy-file', class: '' },
  { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-box2', class: '' },
  { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-attention', class: '' },
  { path: '/mantenimiento/usuario', title: 'Usuarios',  icon:'pe-7s-users', class: '' },
  { path: '/mantenimiento/entidad-promotora', title: 'Entidad',  icon:'pe-7s-id', class: '' },
  { path: '/mantenimiento/checklist', title: 'Checklist',  icon:'pe-7s-note', class: '' }
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  ROUTES_ROL: any[];

  constructor(private _usuarioService: UsuarioService) {
    this.ROUTES_ROL = this.obtener_rutas();
  }

  ngOnInit() {
    this.menuItems = this.ROUTES_ROL.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };


  obtener_rutas() {

    let rutas: any[];

    switch (this._usuarioService.usuario.Roles[0].IdRol) {
      case 1269: // Administrador ECH
      rutas = ROUTES_ETAPAS;
      break;
      case 1270: // Entidad Promotora PCH
      rutas = ROUTES_PCH;
      break;
      case 1271: // Autoridad PCO
      rutas = ROUTES_PCO;
      break;
      case 1272: // Director ECH
      rutas = ROUTES_ETAPAS;
      break;
      case 1273: // Aprobador MTC
      rutas = ROUTES_PCH_PCO;
      break;
      case 1274: // Consulta MTC
      rutas = ROUTES_CONSULTA;
      break;
      case 1275: // Administrador del sistema
      rutas = ROUTES_TODOS;
      break;    
      default:
        rutas = []
      break;
    }

    return rutas;

  }

}


































export const ROUTES: RouteInfo[] = [
    
  /* { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' }, */
  { path: '/etapa/evaluacion-documentaria', title: 'Eval. Documentaria',  icon:'pe-7s-note2', class: '' },
  { path: '/etapa/verificacion-fisica', title: 'Verificación Física',  icon:'pe-7s-look', class: '' },
  { path: '/etapa/eliminacion-fluidos', title: 'Eliminación Fluidos',  icon:'pe-7s-paint-bucket', class: '' },
  { path: '/etapa/desguace-vehicular', title: 'Desguace Vehicular',  icon:'pe-7s-car', class: '' },
  { path: '/etapa/compactacion', title: 'Compactación',  icon:'pe-7s-hammer', class: '' },
  { path: '/etapa/emision-cdv', title: 'Emisión del CDV',  icon:'pe-7s-copy-file', class: '' },
  { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-box2', class: '' },
  { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-attention', class: '' },

  // Mantenimientos

  { path: '/mantenimiento/usuario', title: 'Usuarios',  icon:'pe-7s-users', class: '' },
  { path: '/mantenimiento/entidad-promotora', title: 'Entidad',  icon:'pe-7s-id', class: '' },
  { path: '/mantenimiento/checklist', title: 'Checklist',  icon:'pe-7s-note', class: '' }
  /* { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' } */
  
 /*  { path: '/pco-entidad-promotora', title: 'PCO Entidad',  icon:'pe-7s-copy-file', class: '' },
  { path: '/pco-admin', title: 'PCO Admin',  icon:'pe-7s-copy-file', class: '' }, */
  // Extras
  /* { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
  { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
  { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
  { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
  { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
  { path: '/dashboard', title: 'Reportes',  icon: 'pe-7s-graph', class: '' }, */
  
 /*  { path: '/programa-chatarreo', title: 'Nuevo Proceso',  icon:'pe-7s-keypad', class: 'active-pro' } */
];