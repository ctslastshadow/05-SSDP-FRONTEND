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
