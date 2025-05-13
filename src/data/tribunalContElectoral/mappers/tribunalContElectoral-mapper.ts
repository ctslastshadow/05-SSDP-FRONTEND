import { IListArchivoViewModel } from "src/domain/general/i-list-archivo.viewModel";
import { AMapper } from "./a-mapper";
import { IArchivoModel } from "src/data/proceso/models/i-proceso.model";
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

   

    async filesToUint8Arrays(files: IListArchivoViewModel[]): Promise<IArchivoModel[]> {
        const filePromises = files.map(async (file) => await this.fileToUint8Arrayfor(file));
        return Promise.all(filePromises);
    }

    async fileToUint8Arrayfor(file: IListArchivoViewModel): Promise<IArchivoModel> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file.documento!);
            reader.onload = () => {
                const stringBase64: string | ArrayBuffer | null = reader.result;

                const data: IArchivoModel = {
                    codigoArchivo: file.codigoArchivo,
                    tipoArchivo: file.tipoArchivo,
                    descripcion: file.descripcion,
                    nombre: file.nombre,
                    documento: stringBase64!.toString().split('base64,')[1],
                };
                resolve(data);
            };
            reader.onerror = (error) => reject(error);
        });
    }
}
