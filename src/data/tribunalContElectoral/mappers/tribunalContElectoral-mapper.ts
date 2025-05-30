import { AMapper } from "./a-mapper";
import { uid } from 'uid';
import { IGetSentenciasTCERegistroViewModel } from "src/domain/tribunalContElectoral/viewModels/i-sentenciasTCE.viewModel";
import { IGetSentenciasTCERegistroModel} from "../models/tribunalContElectoral.model";


export class tribunalContElectoralMapper extends AMapper<any, any> {
    public clientIp: string;
    public clientBrowser: string;

    constructor() {
        super();
        this.clientIp = sessionStorage.getItem('clientIp') || '1.1.1.1';
        this.clientBrowser = sessionStorage.getItem('clientBrowser') || 'Navegador desconocido';
    }

    mapGetRegistroTo(param: IGetSentenciasTCERegistroViewModel): IGetSentenciasTCERegistroModel {
      // Crear el cuerpo completo con todos los campos
      let body = {
         cedula: param.cedula ?? '' ,
         usuario: param.usuario ?? '' ,
         proceso: param.proceso ?? '' ,
         ip: this.clientIp ?? '' ,
         navegador: this.clientBrowser ?? '' ,
         servidor: param.servidor ?? '' ,
         modulo: param.modulo ?? '' 
              
      };
  
      console.log('body mapper ', body); // Revisa el contenido generado
      return body;
  }
}
