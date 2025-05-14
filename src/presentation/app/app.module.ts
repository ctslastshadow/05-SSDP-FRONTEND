import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { HttpClientModule } from '@angular/common/http';
import { DataModule } from 'src/data/data.module';
import { SuspensionModule } from 'src/presentation/app/suspension/suspension.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    SuspensionModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
