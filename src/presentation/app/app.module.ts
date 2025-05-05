import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { ACJudicaturaService } from 'src/domain/consJudicatura/services/a-consJuditatura-service';
import { CJudicaturaService } from 'src/data/consJudicatura/service/consJudicatura.service';
import { HttpClientModule } from '@angular/common/http';
import { CJudicaturaMapper } from 'src/data/consJudicatura/mappers/consJudicatura-mapper';
import { DataModule } from 'src/data/data.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
