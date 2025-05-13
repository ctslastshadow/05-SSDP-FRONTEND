/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";
import { IGetSentenciasTCERegistroViewModel } from "../viewModels/i-sentenciasTCE.viewModel";
import { ITCESentenciaRsViewModel  } from "src/data/tribunalContElectoral/models/tribunalContElectoral.model";

/** Cuando utilicemos la capa de infraestructura extendamos del gateway y no del caso de uso  resumen: que queremos no del como   */
export abstract class ATribunalContElectoralService {
    public abstract getTCESentenciasCedula(body: IGetSentenciasTCERegistroViewModel): Observable<ITCESentenciaRsViewModel>;

}
