import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { StatusResponseService } from "src/base/status-response.service";
import { Observable, catchError, of } from "rxjs";

import { ASuspensionService } from "src/domain/suspension/services/a-suspension-service";

import { IExistenciaSuspensionRsViewModel } from "../models/suspension.model";
import { IGetExistenciaSuspensionViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";

import { IListarDatosCiudadanoRsViewModel } from "../models/suspension.model";
import { IGetDatosCiudadanoViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";

import { IInsertarSuspensionRsViewModel } from "../models/suspension.model";
import { IGetInsertarSuspensionViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";

import { ISuspensionByEstadoRsViewModel } from "../models/suspension.model";
import { IGetSuspensionesByEstadoViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";

import { suspensionMapper} from "../mappers/suspension-mapper";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

@Injectable({
    providedIn: 'root',
})
export class SuspensionService extends ASuspensionService {

    private urlServiciosSSDP: string = environment.apiUrlSSDP;
    constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService,
        private _mapper: suspensionMapper) {
        super();
    }

    public getExistenciaSuspencionService(body: IGetExistenciaSuspensionViewModel): Observable<IExistenciaSuspensionRsViewModel> {
     
        const url = `${this.urlServiciosSSDP}Suspension/ListarDatosNumeroSentencia`;
        console.log('URL verificar Existencia Sentencia :', url); 
        console.log(' Existencia Sentencia BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetExistenciaSuspensionTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

    public getDatosCiudadanosService(body: IGetDatosCiudadanoViewModel): Observable<IListarDatosCiudadanoRsViewModel> {
     
        const url = `${this.urlServiciosSSDP}Suspension/ListarDatosCiudadano`;
        console.log('URL Datos Ciudadano :', url); 
        console.log(' Datos Ciudadano - BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetDatosCiudadanoTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

    public getInsertarSuspensionService(body: IGetInsertarSuspensionViewModel): Observable<IInsertarSuspensionRsViewModel> {
        
        const url = `${this.urlServiciosSSDP}Suspension/GuardarSuspension`;
        console.log('URL Ingreso Sentencia:', url); 
        console.log(' Ingreso Sentencia BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetInsertarSentenciaTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }
    

    public getSuspensionByEstadoService(body: IGetSuspensionesByEstadoViewModel): Observable<ISuspensionByEstadoRsViewModel> {
        
        const url = `${this.urlServiciosSSDP}Suspension/ListarDatosSuspensionesByEstado`;
        console.log('URL Ingreso Sentencia:', url); 
        console.log(' Seleccionar Sentencias Por ESTADO --- BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetSentenciaByEstadoTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }


}
