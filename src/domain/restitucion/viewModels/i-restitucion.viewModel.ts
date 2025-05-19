//Aquí solo los datos de Salida

export interface IGetSuspensionCiudadanoViewModel {
    cedula: string;
    codigoEstadoCiudadano: string;
}


export interface IGetInsertarRestitucionViewModel {
    codigoSuspension: number;
    cedula: string;
    nombreCiudadano: string;
    numeroSentencia: string;
    observacion: string;
    urlDocumentoRestitucion: string;
    codigoTransaccion: string;
    codigoUsuario: string;
}


