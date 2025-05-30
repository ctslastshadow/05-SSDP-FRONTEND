import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspensionRoutingModule } from './suspension-routing.module';
import { ConsultaSuspensionComponent } from './pages/consulta-suspension/consulta-suspension.component';
// DevExtreme
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { VerPdfModalComponent } from './pages/ver-pdf-modal/ver-pdf-modal.component';
import { DxPopupModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AplicacionSuspensionComponent } from './pages/aplicacion-suspension/aplicacion-suspension.component';

@NgModule({
  declarations: [
    ConsultaSuspensionComponent,
    VerPdfModalComponent,
    AplicacionSuspensionComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, 
    SuspensionRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    MatDialogModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    DxPopupModule,
    DxFileUploaderModule,
    MatIconModule,   
    MatButtonModule
    
  ],
  exports: [ConsultaSuspensionComponent  ]
  
})
export class SuspensionModule { }
