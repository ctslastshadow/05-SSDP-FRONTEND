import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { StatusResponseService } from "src/base/status-response.service";
import { Observable, catchError, of } from "rxjs";

import { ARestitucionService } from "src/domain/restitucion/services/a-restitucion-service";


import { IListarSuspensionCiudadanoRsViewModel } from "../models/restitucion.model";
import { IGetSuspensionCiudadanoViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";

import { IInsertarRestitucionRsViewModel } from "../models/restitucion.model";
import { IGetInsertarRestitucionViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";

import { IVerificarSuspensionesActivasRsViewModel } from "../models/restitucion.model";
import { IGetVerificarSuspensionesActivasViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";


import { IActualizarEstadoSuspensionRsViewModel } from "../models/restitucion.model";
import { IGetActualizarEstadoSuspensionViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";


import { restitucionMapper } from "../mappers/restitucion-mapper";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

@Injectable({
    providedIn: 'root',
})
export class RestitucionService extends ARestitucionService {

    private urlServiciosSSDP: string = environment.apiUrlSSDP;
    constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService,
        private _mapper: restitucionMapper) {
        super();
    }
    

    public getSuspensionCiudadanoService(body: IGetSuspensionCiudadanoViewModel): Observable<IListarSuspensionCiudadanoRsViewModel> {
        const url = `${this.urlServiciosSSDP}Restitucion/ListarDatosSuspensiones`;
        console.log(' Get Datos Suspensiones - BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetSuspensionCiudadanoTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

    public getInsertarRestitucionService(body: IGetInsertarRestitucionViewModel): Observable<IInsertarRestitucionRsViewModel> {
     
        const url = `${this.urlServiciosSSDP}Restitucion/GuardarIngresoRestitucion`;
        console.log('URL Ingreso Sentencia:', url); 
        console.log(' Ingreso Sentencia BODY que se enviará:', body); 
        return this._http.post<any>(url, this._mapper.mapGetInsertarRestitucionTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

       public getVerificarSuspensionesActivasService(body: IGetVerificarSuspensionesActivasViewModel): Observable<IVerificarSuspensionesActivasRsViewModel> {
     
        const url = `${this.urlServiciosSSDP}Restitucion/VerificarSuspensionesActivas`;
        console.log('URL Verificar Suspensiones Activas:', url); 
        console.log(' Ingreso Body Verificar Suspensiones Activas:', body); 
        return this._http.post<any>(url, this._mapper.mapGetVerificarSuspensionesActivasTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }


     public getActualizarEstadoSuspesnsionService(body: IGetActualizarEstadoSuspensionViewModel): Observable<IActualizarEstadoSuspensionRsViewModel> {
     
        const url = `${this.urlServiciosSSDP}Restitucion/ActualizarEstadoSuspencion`;
        console.log('URL Actualizar estado Suspension:', url); 
        console.log(' Ingreso Body actualizar estado suspension:', body); 
        return this._http.post<any>(url, this._mapper.mapGetModificarEstadoSuspensionTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }


}
