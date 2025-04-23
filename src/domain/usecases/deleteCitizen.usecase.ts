import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { CitizenRepository } from '../repositories/citizen.repository';


export class DeleteCitizenUseCase implements UseCase<{ auditoria: any; cedulaIdentidad: string; }, string> {

    constructor(private citizenRepository: CitizenRepository) { }

    execute(
       params: { auditoria: any, cedulaIdentidad: string},
    ): Observable<string> {
        return this.citizenRepository.deleteCitizen(params);
    }
}