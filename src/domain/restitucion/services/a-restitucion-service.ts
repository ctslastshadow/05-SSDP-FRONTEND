/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";

//Listar Suspensiones
import { IGetSuspensionCiudadanoViewModel } from "../viewModels/i-restitucion.viewModel";
import { IListarSuspensionCiudadanoRsViewModel } from "src/data/restitucion/models/restitucion.model";

//Insertar Restitucions
import { IGetInsertarRestitucionViewModel } from "../viewModels/i-restitucion.viewModel";
import { IInsertarRestitucionRsViewModel } from "src/data/restitucion/models/restitucion.model";

//Select Suspensiones Activas
import { IGetVerificarSuspensionesActivasViewModel } from "../viewModels/i-restitucion.viewModel";
import { IVerificarSuspensionesActivasRsViewModel } from "src/data/restitucion/models/restitucion.model";

//Update suspension por estado
import { IGetActualizarEstadoSuspensionViewModel } from "../viewModels/i-restitucion.viewModel";
import { IActualizarEstadoSuspensionRsViewModel } from "src/data/restitucion/models/restitucion.model";


// Aquí se toma los datos de domain/models y data models de como los metodos usaran la respuesta
export abstract class ARestitucionService {

    public abstract getSuspensionCiudadanoService(body: IGetSuspensionCiudadanoViewModel): Observable<IListarSuspensionCiudadanoRsViewModel>;

    public abstract getInsertarRestitucionService(body: IGetInsertarRestitucionViewModel): Observable<IInsertarRestitucionRsViewModel>;

    public abstract getVerificarSuspensionesActivasService(body: IGetVerificarSuspensionesActivasViewModel): Observable<IVerificarSuspensionesActivasRsViewModel>;

    public abstract getActualizarEstadoSuspesnsionService(body: IGetActualizarEstadoSuspensionViewModel): Observable<IActualizarEstadoSuspensionRsViewModel>;

}
