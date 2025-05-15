import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASuspensionService } from '../services/a-suspension-service';
import { IGetDatosCiudadanoViewModel } from '../viewModels/i-suspension.viewModel';
import { IListarDatosCiudadanoRsViewModel  } from 'src/data/suspension/models/suspension.model';

@Injectable({ providedIn: 'root' })

export class GetDatosCiudadanoUseCase {
    constructor(private _aDatosCiudadanoService: ASuspensionService) { }
   
    public getDatosCiudadano(body: IGetDatosCiudadanoViewModel): Observable<IListarDatosCiudadanoRsViewModel>{
        return this._aDatosCiudadanoService.getDatosCiudadanosService(body);
    }

}
