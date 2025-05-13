import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ATribunalContElectoralService } from '../services/a-tribunalContElectoral-service';
import { IGetSentenciasTCERegistroViewModel } from '../viewModels/i-sentenciasTCE.viewModel';
import { ITCESentenciaRsViewModel } from 'src/data/tribunalContElectoral/models/tribunalContElectoral.model';
//import { ICjSentenciaRsViewModel } from 'src/data/consJudicatura/models/consJudicatura.model';
/**
 * Los casos de uso solo definen como se comporta nuestro sistema,
 * definiendo los datos de entrada necesarios, y cual será su salida.
 * Los cambios en esta capa no deberaan afectar a las entidades,
 * al igual que los cambios en otras capas externas no deberían afectar
 * a los casos de uso.
 */

@Injectable({ providedIn: 'root' })

export class GetTribunalContElectoralUseCase {
    constructor(private _aTribunalContElectoralService: ATribunalContElectoralService) { }
   
    public getTCESentenciasCedula(body: IGetSentenciasTCERegistroViewModel): Observable<ITCESentenciaRsViewModel>{
        return this._aTribunalContElectoralService.getTCESentenciasCedula(body);
    }

}
