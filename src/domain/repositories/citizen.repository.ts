import { Observable } from 'rxjs';
import { ICiudadanoViewModel } from '../models/ciudadano.viewModel';

export abstract class CitizenRepository {
    abstract getListCitizens(params: {auditoria: any}): Observable<ICiudadanoViewModel>;
    abstract saveCitizen(params: {auditoria: any, cedulaIdentidad: string, apellidosNombres: string}): Observable<string>;
    abstract updateCitizen(params: {auditoria: any, cedulaIdentidad: string, apellidosNombres: string}): Observable<string>;
    abstract deleteCitizen(params: {auditoria: any, cedulaIdentidad: string}): Observable<string>;
}