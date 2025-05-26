import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARestitucionService } from '../services/a-restitucion-service';
import { IGetActualizarEstadoSuspensionViewModel } from '../viewModels/i-restitucion.viewModel';
import { IActualizarEstadoSuspensionRsViewModel } from 'src/data/restitucion/models/restitucion.model';

@Injectable({ providedIn: 'root' })

export class GetActualizarEstadoSuspensionUseCase {
    constructor(private _aActualizarEstadoSuspensionService: ARestitucionService) { }
   
    public getActualizarEstadoSuspension(body: IGetActualizarEstadoSuspensionViewModel): Observable<IActualizarEstadoSuspensionRsViewModel>{
        return this._aActualizarEstadoSuspensionService.getActualizarEstadoSuspesnsionService(body);
    }

}
