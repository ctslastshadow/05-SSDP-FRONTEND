import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaSuspensionComponent } from './pages/consulta-suspension/consulta-suspension.component';
import { AplicacionSuspensionComponent } from './pages/aplicacion-suspension/aplicacion-suspension.component';

const routes: Routes = [
  {
    path: 'ingreso', component: ConsultaSuspensionComponent
  },
    {
    path: 'aplicacion', component: AplicacionSuspensionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspensionRoutingModule { }
