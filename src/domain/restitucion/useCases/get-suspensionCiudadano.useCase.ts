import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARestitucionService } from '../services/a-restitucion-service';
import { IGetSuspensionCiudadanoViewModel } from '../viewModels/i-restitucion.viewModel';
import { IListarSuspensionCiudadanoRsViewModel  } from 'src/data/restitucion/models/restitucion.model';

@Injectable({ providedIn: 'root' })

export class GetSuspensionCiudadanoUseCase {
    constructor(private _aSuspensionCiudadanoService: ARestitucionService) { }
   
    public getSuspensionCiudadano(body: IGetSuspensionCiudadanoViewModel): Observable<IListarSuspensionCiudadanoRsViewModel>{
        return this._aSuspensionCiudadanoService.getSuspensionCiudadanoService(body);
    }

}
