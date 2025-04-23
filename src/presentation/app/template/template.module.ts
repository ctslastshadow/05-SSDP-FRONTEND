import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { RouterModule, Routes } from '@angular/router';
//import { LibDesignSystemModule } from '@mycne/lib-design-system';
import { DataModule } from 'src/data/data.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { CitizenViewComponent } from './views/citizen-view/citizen-view.component';
import { FormTemplateViewComponent } from './views/form-template-view/form-template-view.component';

const routes: Routes = [{ path: '', component: TemplateComponent },
{ path: 'citizen', component: CitizenViewComponent },
{ path: 'formexample', component: FormTemplateViewComponent }
];

@NgModule({
  declarations: [TemplateComponent, CitizenViewComponent, FormTemplateViewComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataModule,
    HelpersModule,
    //LibDesignSystemModule
    
  ]
})
export class TemplateModule { }
