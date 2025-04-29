import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspensionRoutingModule } from './suspension-routing.module';
import { ConsultaSuspensionComponent } from './pages/consulta-suspension/consulta-suspension.component';

// DevExtreme
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';

@NgModule({
  declarations: [
    ConsultaSuspensionComponent
  ],
  imports: [
    CommonModule,
    SuspensionRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxValidatorModule,
    DxValidationGroupModule,
  ],
  exports: [ConsultaSuspensionComponent  ]
})
export class SuspensionModule { }
