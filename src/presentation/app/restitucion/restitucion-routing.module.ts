import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaRestitucionComponent } from './pages/consulta-restitucion/consulta-restitucion.component';
import { AplicacionRestitucionComponent } from './pages/aplicacion-restitucion/aplicacion-restitucion.component';

const routes: Routes = [
    {
      path: 'ingreso', component: ConsultaRestitucionComponent
    },
    {
      path: 'aplicacion', component: AplicacionRestitucionComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestitucionRoutingModule { }
