import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaRestitucionComponent } from './pages/consulta-restitucion/consulta-restitucion.component';

const routes: Routes = [
   {
      path: '', component: ConsultaRestitucionComponent
    },
    {
      path: 'consulta', component: ConsultaRestitucionComponent
    },
    {
      path: '**', redirectTo: ''
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestitucionRoutingModule { }
