import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetGuardarAplicacionSuspensionViewModel} from '../viewModels/i-suspension.viewModel';
import { IGuardarAplicacionSuspensionRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetGuardarAplicacionSuspensionUseCase {
    constructor(private _aGuardarAplicacionSuspensionervice: ASuspensionService) { }
   
    public getGuardarAplicacionSuspension(body: IGetGuardarAplicacionSuspensionViewModel): Observable<IGuardarAplicacionSuspensionRsViewModel>{
        return this._aGuardarAplicacionSuspensionervice.getGuardarAplicacionSuspensionService(body);
    }

}
