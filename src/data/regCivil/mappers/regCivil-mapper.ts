import { AMapper } from "./a-mapper";
import { uid } from 'uid';
import { IGetRegistroCivilViewModel } from "src/domain/regCivil/viewModels/i-regCivil.viewModel";
import { IGetRegistroCivilModel} from "../models/regCivil.model";


export class RCivilMapper extends AMapper<any, any> {
    public clientIp: string;
    public clientBrowser: string;

    constructor() {
        super();
        this.clientIp = sessionStorage.getItem('clientIp') || '1.1.1.1';
        this.clientBrowser = sessionStorage.getItem('clientBrowser') || 'Navegador desconocido';
    }

    mapGetRegistroCivilInfoTo(param: IGetRegistroCivilViewModel): IGetRegistroCivilModel {
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
  
      console.log('body mapper RC', body); // Revisa el contenido generado
      return body;
  }

 
}
