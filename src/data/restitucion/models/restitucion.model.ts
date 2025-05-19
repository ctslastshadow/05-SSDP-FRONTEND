import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

////////////////////////Listar Suspensiones del ciudadano/////////////////////
//Respuesta esperada del endpoint
export interface IListarSuspensionCiudadanoRsViewModel extends IResponseStatusViewModel {
    data?: IListarSuspensionCiudadanoViewModel[];

}
export interface IListarSuspensionCiudadanoViewModel {
    info: string | null;
    codigoSuspension: string | null;
    cedula: string | null;
    nombreCiudadano: string | null;
    estadoCiudadano: string | null;
    nombreInstitucion: string | null;
    numeroSentencia: string | null;
    duracion: string | null;
    tipoDuracion: string | null;
    fechaInicioSentencia: string | null;
    fechaFinSentencia: string | null;
    fuente: string | null;
    urlDocumentoSentencia: string | null;
}

//Modelo de Ingreso de datos
export interface IGetSuspensionCiudadanoModel {
    auditoria: {
        usuario: string;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    cedula: string;
    codigoEstadoCiudadano: string;
}



/////////////////////////Insertar la Restitucion////////////////////////
//Respuesta esperada del endpoint
export interface IInsertarRestitucionRsViewModel extends IResponseStatusViewModel {
    data?: IIngresarRestitucionViewModel[];

}
export interface IIngresarRestitucionViewModel {
    info: string | null;
    mensaje: string | null;
}

//Modelo de Ingreso de datos
export interface IGetInsertarRestitucionModel {
    auditoria: {
        usuario: string;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    codigoSuspension: number;
    cedula: string;
    nombreCiudadano: string;
    numeroSentencia: string;
    observacion: string;
    urlDocumentoRestitucion: string;
    codigoTransaccion: string;
    codigoUsuario: string;
}




