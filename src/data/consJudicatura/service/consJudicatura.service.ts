import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { StatusResponseService } from "src/base/status-response.service";
import { Observable, catchError, of } from "rxjs";
import { ACJudicaturaService } from "src/domain/consJudicatura/services/a-consJuditatura-service";
import { ICjSentenciaRsViewModel } from "../models/consJudicatura.model";
import { IGetSentenciasRegistroViewModel } from "src/domain/consJudicatura/viewModels/i-sentencias.viewModel";
import { CJudicaturaMapper } from "../mappers/consJudicatura-mapper";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

@Injectable({
    providedIn: 'root',
})
export class CJudicaturaService extends ACJudicaturaService {
    private url: string = environment.apiUrlDinarp;
    constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService,
        private _mapper: CJudicaturaMapper) {
        super();
    }

    public getCJSentenciasCedula(body: IGetSentenciasRegistroViewModel): Observable<ICjSentenciaRsViewModel> {
     
        const url = `${this.url}consultarSentenciaCJ`;
        console.log('URL consultarSentenciaCJ  :', url); //
        console.log('🔎 BODY que se enviará:', body); // Muestra todo el objeto estructurado
        return this._http.post<any>(url, this._mapper.mapGetRegistroTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

}
