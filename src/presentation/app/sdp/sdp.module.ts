import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdpComponent } from './sdp.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: SdpComponent,
  },
  {
    path: 'ciudadanos',
    loadChildren: () => import('../../app/ciudadanos/ciudadanos.module').then((m) => m.CiudadanosModule),
    
  },
  {
    path: 'suspension',
    loadChildren: () => import('../../app/suspension/suspension.module').then((m) => m.SuspensionModule),
  },
  {
    path: 'restitucion',
    loadChildren: () => import('../../app/restitucion/restitucion.module').then((m) => m.RestitucionModule),
  },
  {
    path: '**',
    redirectTo: '',
  }
]

@NgModule({
  declarations: [
    SdpComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SdpModule { }
