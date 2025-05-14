import { AMapper } from "./a-mapper";
import { uid } from 'uid';
import { IGetSentenciasRegistroViewModel } from "src/domain/consJudicatura/viewModels/i-sentencias.viewModel";
import { IGetSentenciasRegistroModel} from "../models/consJudicatura.model";


export class CJudicaturaMapper extends AMapper<any, any> {
    public clientIp: string;
    public clientBrowser: string;

    constructor() {
        super();
        this.clientIp = sessionStorage.getItem('clientIp') || '1.1.1.1';
        this.clientBrowser = sessionStorage.getItem('clientBrowser') || 'Navegador desconocido';
    }

    mapGetRegistroTo(param: IGetSentenciasRegistroViewModel): IGetSentenciasRegistroModel {
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
