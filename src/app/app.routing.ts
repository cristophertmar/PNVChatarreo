import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes =[
  { path: '', redirectTo: 'etapa/evaluacion-documentaria', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent },
  { path: '', component: AdminLayoutComponent, canActivate: [ LoginGuard ], children: [ { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}]},
  { path: '**', redirectTo: 'etapa/evaluacion-documentaria'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
