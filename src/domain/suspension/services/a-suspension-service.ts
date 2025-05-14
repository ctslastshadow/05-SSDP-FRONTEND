/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";
import { IGetExistenciaSuspensionViewModel } from "../viewModels/i-suspension.viewModel";
import { IExistenciaSuspensionRsViewModel } from "src/data/suspension/models/suspension.model";

import { IGetDatosCiudadanoViewModel } from "../viewModels/i-suspension.viewModel";
import { IListarDatosCiudadanoRsViewModel } from "src/data/suspension/models/suspension.model";

import { IGetInsertarSuspensionViewModel } from "../viewModels/i-suspension.viewModel";
import { IInsertarSuspensionRsViewModel } from "src/data/suspension/models/suspension.model";

// Aquí se toma los datos de domain/models y data models de como los metodos usaran la respuesta
export abstract class ASuspensionService {
    public abstract getExistenciaSuspencionService(body: IGetExistenciaSuspensionViewModel): Observable<IExistenciaSuspensionRsViewModel>;

    public abstract getDatosCiudadanosService(body: IGetDatosCiudadanoViewModel): Observable<IListarDatosCiudadanoRsViewModel>;

    public abstract getInsertarSuspensionService(body: IGetInsertarSuspensionViewModel): Observable<IInsertarSuspensionRsViewModel>;
}
