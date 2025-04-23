import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CneDataGridComponent } from './cne-data-grid/cne-data-grid.component';
import { DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    CneDataGridComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadPanelModule,
    DxPopupModule
  ],
  exports: [
    CneDataGridComponent,
  ],
  providers: [
   
  ]
})
export class HelpersModule { }
