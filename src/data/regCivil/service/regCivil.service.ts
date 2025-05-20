import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { StatusResponseService } from "src/base/status-response.service";
import { Observable, catchError, of } from "rxjs";
import { ARCivilService } from "src/domain/regCivil/services/a-regCivil-service";
import { IRCivilRsViewModel } from "../models/regCivil.model";
import { IGetRegistroCivilViewModel } from "src/domain/regCivil/viewModels/i-regCivil.viewModel";
import { RCivilMapper } from "../mappers/regCivil-mapper";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

@Injectable({
    providedIn: 'root',
})
export class RCivilService extends ARCivilService {
    private url: string = environment.apiUrlDinarp;
    constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService,
        private _mapper: RCivilMapper) {
        super();
    }

    public getRCivilInfo(body: IGetRegistroCivilViewModel): Observable<IRCivilRsViewModel> {
     
        const url = `${this.url}consultarRcDemografico`;
        console.log('URL consultarInfoRegCivil  :', url); //
        console.log('🔎 BODY que se enviará:', body); // Muestra todo el objeto estructurado
        return this._http.post<any>(url, this._mapper.mapGetRegistroCivilInfoTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

}
