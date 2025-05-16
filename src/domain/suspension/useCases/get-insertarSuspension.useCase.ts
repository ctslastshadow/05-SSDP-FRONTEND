import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetInsertarSuspensionViewModel} from '../viewModels/i-suspension.viewModel';
import { IInsertarSuspensionRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetInsertarSuspensionUseCase {
    constructor(private _aInsertarSuspensionService: ASuspensionService) { }
   
    public getInsertarSuspension(body: IGetInsertarSuspensionViewModel): Observable<IInsertarSuspensionRsViewModel>{
        console.log('se ingreso al use case ingresar sentencia')
        return this._aInsertarSuspensionService.getInsertarSuspensionService(body);
    }

}
