import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { StatusResponseService } from "src/base/status-response.service";
import { Observable, catchError, of } from "rxjs";
import { ATribunalContElectoralService } from "src/domain/tribunalContElectoral/services/a-tribunalContElectoral-service";
import { ITCESentenciaRsViewModel, ITCESentenciaViewModel } from "../models/tribunalContElectoral.model";
import { IGetSentenciasTCERegistroViewModel } from "src/domain/tribunalContElectoral/viewModels/i-sentenciasTCE.viewModel";
import { tribunalContElectoralMapper } from "../mappers/tribunalContElectoral-mapper";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

@Injectable({
    providedIn: 'root',
})
export class TribunalContElectoralService  extends ATribunalContElectoralService {
    private url: string = environment.apiUrlDinarp;
    constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService,
        private _mapper: tribunalContElectoralMapper) {
        super();
    }

    public getTCESentenciasCedula(body: IGetSentenciasTCERegistroViewModel): Observable<ITCESentenciaRsViewModel> {
     
        const url = `${this.url}consultarSentenciaTCE`;
        console.log('URL consultarSentenciaTCE :', url); //
        console.log('🔎 BODY que se enviará TCE!!:', body); // Muestra todo el objeto estructurado
        return this._http.post<any>(url, this._mapper.mapGetRegistroTo(body)).pipe(
        
            catchError((error) => {
                console.log("error" +body)
                return of(this._statusResponseService.error(error));
            })
        );
    }

}
