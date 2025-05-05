import { IListArchivoViewModel } from "src/domain/general/i-list-archivo.viewModel";
import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

export interface ICjSentenciaRsViewModel extends IResponseStatusViewModel {
    data?: ICjSentenciaViewModel[];

}

export interface ICjSentenciaViewModel {
    codigoCjSentencias: number | null;
    estadoProceso: number | null;
    estadoSentencia: number | null;
    asuntoDelito: string | null;
    documento: string | null;
    documentoRestitucion: string | null;
    fechaIngreso: string | null;
    fechaRazon: string | null;
    fechaSentencias: string | null;
    nombreMateria: string | null;
    nombreProcesado: string | null;
    numeroProceso: string | null;
    numeroUniIdentidad: string | null;
    tipoAccion: string | null;
    tipoRazon: string | null;
    tipoSentencia: string | null;
    unidadJudicial: string | null;
}

export interface IGetSentenciasRegistroModel {
    auditoria: {
        usuario: number;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    codigoModulo: number;
    codigoPaquete: number;
    parameters: {
        nombre: string;
        valor: string;
    }[];
}



