import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARestitucionService } from '../services/a-restitucion-service';
import { IGetVerificarSuspensionesActivasViewModel } from '../viewModels/i-restitucion.viewModel';
import { IVerificarSuspensionesActivasRsViewModel } from 'src/data/restitucion/models/restitucion.model';

@Injectable({ providedIn: 'root' })

export class GetVerificarSuspensionesActivasUseCase {
    constructor(private _aVerificarSuspensionesActivasService: ARestitucionService) { }
   
    public getVerificarSuspensionesActivas(body: IGetVerificarSuspensionesActivasViewModel): Observable<IVerificarSuspensionesActivasRsViewModel>{
        return this._aVerificarSuspensionesActivasService.getVerificarSuspensionesActivasService(body);
    }

}
