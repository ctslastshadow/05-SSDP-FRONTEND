import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetInsertarSuspensionViewModel} from '../viewModels/i-suspension.viewModel';
import { IInsertarSuspensionRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetInsertarSuspensionUseCase {
    constructor(private _aInsertarSuspensionService: ASuspensionService) { }
   
    public getExistenciaSuspension(body: IGetInsertarSuspensionViewModel): Observable<IInsertarSuspensionRsViewModel>{
        return this._aInsertarSuspensionService.getInsertarSuspensionService(body);
    }

}
