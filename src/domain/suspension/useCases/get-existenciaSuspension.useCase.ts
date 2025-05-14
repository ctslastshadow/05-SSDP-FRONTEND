import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetExistenciaSuspensionViewModel } from '../viewModels/i-suspension.viewModel';
import { IExistenciaSuspensionRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetExistenciaSuspensionUseCase {
    constructor(private _aExistenciaSuspensionService: ASuspensionService) { }
   
    public getExistenciaSuspension(body: IGetExistenciaSuspensionViewModel): Observable<IExistenciaSuspensionRsViewModel>{
        return this._aExistenciaSuspensionService.getExistenciaSuspencionService(body);
    }

}
