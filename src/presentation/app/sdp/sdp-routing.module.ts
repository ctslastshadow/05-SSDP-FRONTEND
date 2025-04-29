import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SdpComponent } from './sdp.component'

const routes: Routes = [
  {
    path: '',
    component: SdpComponent,    
    
  },
  {
    path: 'ciudadanos',
    loadChildren: () => import('../../../presentation/app/ciudadanos/ciudadanos.module').then((m) => m.CiudadanosModule),
  },
  {
    path: 'suspension',
    loadChildren: () => import('../../../presentation/app/suspension/suspension.module').then((m) => m.SuspensionModule),
  },
  {
    path: 'restitucion',
    loadChildren: () => import('../../../presentation/app/restitucion/restitucion.module').then((m) => m.RestitucionModule),
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SdpRoutingModule { }
