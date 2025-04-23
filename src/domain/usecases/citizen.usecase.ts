import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { ICiudadanoViewModel } from '../models/ciudadano.viewModel';
import { CitizenRepository } from '../repositories/citizen.repository';


export class CitizenUseCase implements UseCase<{ auditoria: any; }, ICiudadanoViewModel> {

    constructor(private citizenRepository: CitizenRepository) { }

    execute(
       params: { auditoria: any },
    ): Observable<ICiudadanoViewModel> {
        return this.citizenRepository.getListCitizens(params);
    }
}