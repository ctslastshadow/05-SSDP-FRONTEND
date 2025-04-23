import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitizenRepository } from 'src/domain/repositories/citizen.repository';
import { CitizenImplementationRepositoryMapper } from './citizen/mappers/citizen-repository.mapper';
import { ICiudadanoViewModel } from 'src/domain/models/ciudadano.viewModel';
import { ICiudadanoModel } from './citizen/entities/ciudadano-model';



/* const listProcess: UserModel[] = [
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
    { id: '040169888', name: 'Christian', lastname: 'Pineiros', direction:'La Carolina', occupation:'Ing. Sistemas' },
]; */

@Injectable({
    providedIn: 'root',
})
export class CitizenImplementationRepository extends CitizenRepository {
    citizenMapper = new CitizenImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    getListCitizens(params: {auditoria: any}): Observable<ICiudadanoViewModel> {
        return this.http
            .post<ICiudadanoModel[]>('https://desa-app01.cne.gob.ec/template-backend/Ciudadano/GetCiudadanos', params)
            .pipe(mergeMap((item) => item))
            .pipe(map(this.citizenMapper.mapFrom));
        //return of(listProcess);
    }

    saveCitizen(params: {auditoria: any, cedulaIdentidad: string, apellidosNombres: string}): Observable<string> {
        return this.http
            .post<string>('https://desa-app01.cne.gob.ec/template-backend/Ciudadano/SaveCiudadano', params);
    }

    updateCitizen(params: {auditoria: any, cedulaIdentidad: string, apellidosNombres: string}): Observable<string> {
        return this.http
            .put<string>('https://desa-app01.cne.gob.ec/template-backend/Ciudadano/EditCiudadano', params);
    }

    deleteCitizen(params: {auditoria: any, cedulaIdentidad: string}): Observable<any> {
        return this.http
            .patch<string>('https://desa-app01.cne.gob.ec/template-backend/Ciudadano/DeleteCiudadano', params);
    }
}
