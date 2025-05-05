import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ACJudicaturaService } from 'src/domain/consJudicatura/services/a-consJuditatura-service';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';
import { CJudicaturaService } from './consJudicatura/service/consJudicatura.service';
import { CJudicaturaMapper } from './consJudicatura/mappers/consJudicatura-mapper';

//* CJSentencias
const GetCJudicaturaUseCaseFactory =
  (aCJudicaturaService: ACJudicaturaService) => new GetCJudicaturaUseCase(aCJudicaturaService);
export const getCJudicaturaUseCaseProvider = {
  provide: GetCJudicaturaUseCase,
  useFactory: GetCJudicaturaUseCaseFactory,
  deps: [ACJudicaturaService],
};

@NgModule({
  declarations: [],
  providers: [
    getCJudicaturaUseCaseProvider,
    CJudicaturaMapper,
    { provide:ACJudicaturaService, useClass:CJudicaturaService}
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataModule { }
