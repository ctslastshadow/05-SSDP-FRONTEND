import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestitucionRoutingModule } from './restitucion-routing.module';
import { ConsultaRestitucionComponent } from './pages/consulta-restitucion/consulta-restitucion.component';

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
import { DxPopupModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DxTemplateModule } from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AplicacionRestitucionComponent } from './pages/aplicacion-restitucion/aplicacion-restitucion.component';


@NgModule({
  declarations: [
    ConsultaRestitucionComponent,
    AplicacionRestitucionComponent,
  ],
  imports: [
       CommonModule,
       FormsModule, 
       RestitucionRoutingModule,
       DxTextBoxModule,
       DxButtonModule,
       DxDataGridModule,
       DxNumberBoxModule,
       DxValidatorModule,
       DxValidationGroupModule,
       MatDialogModule,
       DxTemplateModule,
       DxSelectBoxModule,
       DxDateBoxModule,
       DxPopupModule,
       DxFileUploaderModule,
       MatIconModule,   
       MatButtonModule
  ]
})
export class RestitucionModule { }
