/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";
import { IGetRegistroCivilViewModel } from "../viewModels/i-regCivil.viewModel";
import { IRCivilRsViewModel } from "src/data/regCivil/models/regCivil.model";

/** Cuando utilicemos la capa de infraestructura extendamos del gateway y no del caso de uso  resumen: que queremos no del como   */
export abstract class ARCivilService {
    public abstract getRCivilInfo(body: IGetRegistroCivilViewModel): Observable<IRCivilRsViewModel>;

}
