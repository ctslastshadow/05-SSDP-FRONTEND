import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACJudicaturaService } from '../services/a-consJuditatura-service';
import { IGetSentenciasRegistroViewModel } from '../viewModels/i-sentencias.viewModel';
import { ICjSentenciaRsViewModel } from 'src/data/consJudicatura/models/consJudicatura.model';
/**
 * Los casos de uso solo definen como se comporta nuestro sistema,
 * definiendo los datos de entrada necesarios, y cual será su salida.
 * Los cambios en esta capa no deberaan afectar a las entidades,
 * al igual que los cambios en otras capas externas no deberían afectar
 * a los casos de uso.
 */

@Injectable({ providedIn: 'root' })
export class GetCJudicaturaUseCase {
    constructor(private _aCJudicaturaService: ACJudicaturaService) { }
   
    public getCJSentenciasCedula(body: IGetSentenciasRegistroViewModel): Observable<ICjSentenciaRsViewModel>{
        return this._aCJudicaturaService.getCJSentenciasCedula(body);
    }

}
