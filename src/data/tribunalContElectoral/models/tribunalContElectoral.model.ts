import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

export interface ITCESentenciaRsViewModel extends IResponseStatusViewModel {
    data?: ITCESentenciaViewModel[];

}

export interface ITCESentenciaViewModel {
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

export interface IGetSentenciasTCERegistroModel {
        cedula: string;
        usuario: string;
        proceso: string;
        ip: string;
        navegador: string;
        servidor: string;
        modulo: string;
      }




