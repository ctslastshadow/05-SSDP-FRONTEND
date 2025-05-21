import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetSuspensionesByEstadoViewModel} from '../viewModels/i-suspension.viewModel';
import { ISuspensionByEstadoRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetSuspensionByEstadoUseCase {
    constructor(private _aSuspensionByEstadoService: ASuspensionService) { }
   
    public getSuspensionByEstado(body: IGetSuspensionesByEstadoViewModel): Observable<ISuspensionByEstadoRsViewModel>{
        return this._aSuspensionByEstadoService.getSuspensionByEstadoService(body);
    }

}
