import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { CitizenRepository } from '../repositories/citizen.repository';


export class SaveCitizenUseCase implements UseCase<{ auditoria: any; cedulaIdentidad: string; apellidosNombres: string; }, string> {

    constructor(private citizenRepository: CitizenRepository) { }

    execute(
       params: { auditoria: any, cedulaIdentidad: string, apellidosNombres: string },
    ): Observable<string> {
        return this.citizenRepository.saveCitizen(params);
    }
}