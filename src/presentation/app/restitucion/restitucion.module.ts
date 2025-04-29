import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestitucionRoutingModule } from './restitucion-routing.module';
import { ConsultaRestitucionComponent } from './pages/consulta-restitucion/consulta-restitucion.component';

// DevExtreme
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';


@NgModule({
  declarations: [
    ConsultaRestitucionComponent
  ],
  imports: [
    CommonModule,
    RestitucionRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxValidatorModule,
    DxValidationGroupModule,
  ]
})
export class RestitucionModule { }
