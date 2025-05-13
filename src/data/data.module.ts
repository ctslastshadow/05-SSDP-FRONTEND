import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ACJudicaturaService } from 'src/domain/consJudicatura/services/a-consJuditatura-service';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';
import { CJudicaturaService } from './consJudicatura/service/consJudicatura.service';
import { CJudicaturaMapper } from './consJudicatura/mappers/consJudicatura-mapper';

import { ATribunalContElectoralService } from 'src/domain/tribunalContElectoral/services/a-tribunalContElectoral-service';
import { GetTribunalContElectoralUseCase } from 'src/domain/tribunalContElectoral/useCases/get-tribunalContElectoral.useCase';
import { TribunalContElectoralService } from './tribunalContElectoral/service/tribunalContElectoral.service';
import { tribunalContElectoralMapper } from './tribunalContElectoral/mappers/tribunalContElectoral-mapper';

//* CJSentencias
const GetCJudicaturaUseCaseFactory =
  (aCJudicaturaService: ACJudicaturaService) => new GetCJudicaturaUseCase(aCJudicaturaService);
export const getCJudicaturaUseCaseProvider = {
  provide: GetCJudicaturaUseCase,
  useFactory: GetCJudicaturaUseCaseFactory,
  deps: [ACJudicaturaService],
};

//* TCESentencias
const GetTribunalContElectoralUseCaseFactory =
  (ATribunalContElectoralService: ATribunalContElectoralService) => new GetTribunalContElectoralUseCase(ATribunalContElectoralService);
export const getTribunalContElectoralUseCaseProvider = {
  provide: GetTribunalContElectoralUseCase,
  useFactory: GetTribunalContElectoralUseCaseFactory,
  deps: [ATribunalContElectoralService],
};

@NgModule({
  declarations: [],
  providers: [
    getCJudicaturaUseCaseProvider,
    getTribunalContElectoralUseCaseProvider,
    //Mappers
    CJudicaturaMapper,
    tribunalContElectoralMapper,
    
    { provide:ACJudicaturaService, useClass:CJudicaturaService},
    { provide:ATribunalContElectoralService, useClass:TribunalContElectoralService}
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataModule { }
