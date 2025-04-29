import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaSuspensionComponent } from './pages/consulta-suspension/consulta-suspension.component';

const routes: Routes = [
  {
    path: '', component: ConsultaSuspensionComponent
  },
  {
    path: 'consulta', component: ConsultaSuspensionComponent
  },
  {
    path: '**', redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspensionRoutingModule { }
