import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './pages/consulta/consulta.component';

const routes: Routes = [
  {
    path: '', component: ConsultaComponent
  },
  {
    path: 'consulta', component: ConsultaComponent
  },
  {
    path: '**', redirectTo: ''
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadanosRoutingModule { }
