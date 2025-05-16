import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARestitucionService } from '../services/a-restitucion-service';
import { IGetInsertarRestitucionViewModel } from '../viewModels/i-restitucion.viewModel';
import { IInsertarRestitucionRsViewModel } from 'src/data/restitucion/models/restitucion.model';

@Injectable({ providedIn: 'root' })

export class GetInsertarRestitucionUseCase {
    constructor(private _aInsertarRestitucionService: ARestitucionService) { }
   
    public getInsertarRestitucion(body: IGetInsertarRestitucionViewModel): Observable<IInsertarRestitucionRsViewModel>{
        return this._aInsertarRestitucionService.getInsertarRestitucionService(body);
    }

}
