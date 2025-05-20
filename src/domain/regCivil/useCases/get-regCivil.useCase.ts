import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARCivilService } from '../services/a-regCivil-service';
import { IGetRegistroCivilViewModel } from '../viewModels/i-regCivil.viewModel';
import { IRCivilRsViewModel } from 'src/data/regCivil/models/regCivil.model';


@Injectable({ providedIn: 'root' })

export class GetRCivilUseCase {
    constructor(private _aRCivilService: ARCivilService) { }
   
    public getRCivilInfo(body: IGetRegistroCivilViewModel): Observable<IRCivilRsViewModel>{
        return this._aRCivilService.getRCivilInfo(body);
    }

}
