import { IListArchivoViewModel } from "src/domain/general/i-list-archivo.viewModel";
import { AMapper } from "./a-mapper";
import { IArchivoModel } from "src/data/proceso/models/i-proceso.model";
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
          auditoria: {
              usuario: 1,
              proceso: 500,
              ip: '192.188.1.1',            
              navegador: 'CHROME',   
              tipoRequest: 'C',
              descripcionRequest: 'Consulta',
              servidor: 'C'
          },
          codigoModulo: 0,
          codigoPaquete: 5595,
          parameters: [
              {
                  nombre: 'identificacion',
                  valor: param.cedula ?? '' 
              }
          ]
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
