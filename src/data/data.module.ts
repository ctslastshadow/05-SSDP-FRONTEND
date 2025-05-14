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

import { ASuspensionService } from 'src/domain/suspension/services/a-suspension-service';
import { SuspensionService } from './suspension/service/suspension.service';
import { suspensionMapper } from './suspension/mappers/suspension-mapper';

import { GetExistenciaSuspensionUseCase } from 'src/domain/suspension/useCases/get-existenciaSuspension.useCase';
import { GetDatosCiudadanoUseCase } from 'src/domain/suspension/useCases/get-datosCiudadano.useCase';
import { GetInsertarSuspensionUseCase } from 'src/domain/suspension/useCases/get-insertarSuspension.useCase';

import { ARepositoryService } from 'src/domain/archivos_sentencia/services/a-archivos_sentencia-service';
import { RepositoryService } from './archivos_sentencia/service/archivos_sentencia.service';

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

//* ExistenciaSentencia
const GetExistenciaSuspensionUseCaseFactory =
  (aSuspensionService: ASuspensionService) => new GetExistenciaSuspensionUseCase(aSuspensionService);

export const getExistenciaSuspensionUseCaseProvider = {
  provide: GetExistenciaSuspensionUseCase,
  useFactory: GetExistenciaSuspensionUseCaseFactory,
  deps: [ASuspensionService],
};

//* BuscarDatos
const GetDatosCiudadanoUseCaseFactory =
  (aSuspensionService: ASuspensionService) => new GetDatosCiudadanoUseCase(aSuspensionService);

export const getDatosCiudadanoUseCaseProvider = {
  provide: GetDatosCiudadanoUseCase,
  useFactory: GetDatosCiudadanoUseCaseFactory,
  deps: [ASuspensionService],
};

//* InsertarSentencia
const GetInsertarSentenciaUseCaseFactory =
  (aSuspensionService: ASuspensionService) => new GetInsertarSuspensionUseCase(aSuspensionService);

export const getInsertarSentenciaUseCaseProvider = {
  provide: GetInsertarSuspensionUseCase,
  useFactory: GetInsertarSentenciaUseCaseFactory,
  deps: [ASuspensionService],
};

@NgModule({
  declarations: [],
  providers: [
    getCJudicaturaUseCaseProvider,
    getTribunalContElectoralUseCaseProvider,
    getExistenciaSuspensionUseCaseProvider, 
    getDatosCiudadanoUseCaseProvider,
    getInsertarSentenciaUseCaseProvider,
    //Mappers
    CJudicaturaMapper,
    tribunalContElectoralMapper,
    suspensionMapper, 
    
    { provide:ACJudicaturaService, useClass:CJudicaturaService},
    { provide:ATribunalContElectoralService, useClass:TribunalContElectoralService},
    { provide: ASuspensionService, useClass: SuspensionService },
    { provide: ARepositoryService, useClass: RepositoryService },
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataModule { }
