import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanosRoutingModule } from './ciudadanos-routing.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';

// DevExtreme
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
@NgModule({
  declarations: [  
    ConsultaComponent

  ],
  imports: [
    CommonModule,
    CiudadanosRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxValidatorModule,
    DxValidationGroupModule,
  ],
  exports: [ConsultaComponent  ]
})
export class CiudadanosModule { }
