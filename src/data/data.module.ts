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

import { ARCivilService } from 'src/domain/regCivil/services/a-regCivil-service';
import { GetRCivilUseCase } from 'src/domain/regCivil/useCases/get-regCivil.useCase';
import { RCivilService } from './regCivil/service/regCivil.service';
import { RCivilMapper } from './regCivil/mappers/regCivil-mapper';
//suspension
import { ASuspensionService } from 'src/domain/suspension/services/a-suspension-service';
import { SuspensionService } from './suspension/service/suspension.service';
import { suspensionMapper } from './suspension/mappers/suspension-mapper';

import { GetExistenciaSuspensionUseCase } from 'src/domain/suspension/useCases/get-existenciaSuspension.useCase';
import { GetDatosCiudadanoUseCase } from 'src/domain/suspension/useCases/get-datosCiudadano.useCase';
import { GetInsertarSuspensionUseCase } from 'src/domain/suspension/useCases/get-insertarSuspension.useCase';
//restitucion
import { ARestitucionService } from 'src/domain/restitucion/services/a-restitucion-service';
import { RestitucionService } from './restitucion/service/restitucion.service';
import { restitucionMapper } from './restitucion/mappers/restitucion-mapper';

import { GetSuspensionCiudadanoUseCase } from 'src/domain/restitucion/useCases/get-suspensionCiudadano.useCase';
import { GetInsertarRestitucionUseCase } from 'src/domain/restitucion/useCases/get-insertarRestitucion.useCase';


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

//* RCInfo
const GetRegCivilUseCaseFactory =
  (ARegCivilService: ARCivilService) => new GetRCivilUseCase(ARegCivilService);
export const getRegCivilUseCaseProvider = {
  provide: GetRCivilUseCase,
  useFactory: GetRegCivilUseCaseFactory,
  deps: [ARCivilService],
};

//* ExistenciaSentencia
const GetExistenciaSuspensionUseCaseFactory =
  (aSuspensionService: ASuspensionService) => new GetExistenciaSuspensionUseCase(aSuspensionService);

export const getExistenciaSuspensionUseCaseProvider = {
  provide: GetExistenciaSuspensionUseCase,
  useFactory: GetExistenciaSuspensionUseCaseFactory,
  deps: [ASuspensionService],
};

//* BuscarDatos Ciudadano
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

//* Buscar Sentencias Ciudadano
const GetSuspensionCiudadanoUseCaseFactory =
  (aRestitucionService: ARestitucionService) => new GetSuspensionCiudadanoUseCase(aRestitucionService);

export const getSentenciaCiudadanoUseCaseProvider = {
  provide: GetSuspensionCiudadanoUseCase,
  useFactory: GetSuspensionCiudadanoUseCaseFactory,
  deps: [ARestitucionService],
};

//* InsertarRestitucion
const GetInsertarRestitucionUseCaseFactory =
  (aRestitucionService: ARestitucionService) => new GetInsertarRestitucionUseCase(aRestitucionService);

export const getInsertarRestitucionUseCaseProvider = {
  provide: GetInsertarRestitucionUseCase,
  useFactory: GetInsertarRestitucionUseCaseFactory,
  deps: [ARestitucionService],
};

@NgModule({
  declarations: [],
  providers: [
    getCJudicaturaUseCaseProvider,
    getTribunalContElectoralUseCaseProvider,
    getRegCivilUseCaseProvider,
    getExistenciaSuspensionUseCaseProvider, 
    getDatosCiudadanoUseCaseProvider,
    getInsertarSentenciaUseCaseProvider,
    getSentenciaCiudadanoUseCaseProvider,
    getInsertarRestitucionUseCaseProvider,

    //Mappers
    CJudicaturaMapper,
    tribunalContElectoralMapper,
    RCivilMapper,
    suspensionMapper, 
    restitucionMapper,

     //provide use class
    { provide:ACJudicaturaService, useClass:CJudicaturaService},
    { provide:ATribunalContElectoralService, useClass:TribunalContElectoralService},
    { provide:ARCivilService, useClass:RCivilService},
    { provide: ASuspensionService, useClass: SuspensionService },
    { provide: ARestitucionService, useClass: RestitucionService },
    { provide: ARepositoryService, useClass: RepositoryService },
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataModule { }
