import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    
    /* { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' }, */
    { path: '/etapa/evaluacion-documentaria', title: 'Eval. Documentaria',  icon:'pe-7s-note2', class: '' },
    { path: '/etapa/verificacion-fisica', title: 'Verificación Física',  icon:'pe-7s-look', class: '' },
    { path: '/etapa/eliminacion-fluidos', title: 'Eliminación Fluidos',  icon:'pe-7s-paint-bucket', class: '' },
    { path: '/etapa/desguace-vehicular', title: 'Desguace Vehicular',  icon:'pe-7s-car', class: '' },
    { path: '/etapa/compactacion', title: 'Compactación',  icon:'pe-7s-hammer', class: '' },
    { path: '/etapa/emision-cdv', title: 'Emisión del CDV',  icon:'pe-7s-copy-file', class: '' },
    /* { path: '/chatarreo-obligatorio', title: 'Chatarreo Obligatorio',  icon:'pe-7s-copy-file', class: '' },
    { path: '/pco-entidad-promotora', title: 'PCO Entidad',  icon:'pe-7s-copy-file', class: '' },
    { path: '/pco-admin', title: 'PCO Admin',  icon:'pe-7s-copy-file', class: '' }, */
    // Extras
    /* { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/dashboard', title: 'Reportes',  icon: 'pe-7s-graph', class: '' }, */
    /* { path: '/programa-chatarreo', title: 'Programa Chatarreo',  icon:'pe-7s-keypad', class: 'active-pro' }  */
    { path: '/programa-chatarreo', title: 'Nuevo Proceso',  icon:'pe-7s-keypad', class: 'active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
