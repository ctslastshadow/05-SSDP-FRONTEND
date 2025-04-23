import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanosRoutingModule } from './ciudadanos-routing.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';

@NgModule({
  declarations: [  
    ConsultaComponent

  ],
  imports: [
    CommonModule,
    CiudadanosRoutingModule
  ],
  exports: [ConsultaComponent  ]
})
export class CiudadanosModule { }
