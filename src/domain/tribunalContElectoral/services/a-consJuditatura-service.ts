/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";
import { IGetSentenciasRegistroViewModel } from "../viewModels/i-sentencias.viewModel";
import { ICjSentenciaRsViewModel } from "src/data/consJudicatura/models/consJudicatura.model";

/** Cuando utilicemos la capa de infraestructura extendamos del gateway y no del caso de uso  resumen: que queremos no del como   */
export abstract class ACJudicaturaService {
    public abstract getCJSentenciasCedula(body: IGetSentenciasRegistroViewModel): Observable<ICjSentenciaRsViewModel>;

}
