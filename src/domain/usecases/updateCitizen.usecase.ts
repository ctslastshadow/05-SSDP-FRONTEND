import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { CitizenRepository } from '../repositories/citizen.repository';


export class UpdateCitizenUseCase implements UseCase<{ auditoria: any; cedulaIdentidad: string; apellidosNombres: string; }, string> {

    constructor(private citizenRepository: CitizenRepository) { }

    execute(
       params: { auditoria: any, cedulaIdentidad: string, apellidosNombres: string },
    ): Observable<string> {
        return this.citizenRepository.updateCitizen(params);
    }
}