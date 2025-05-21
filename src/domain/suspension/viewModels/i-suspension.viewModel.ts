export interface IGetDatosCiudadanoViewModel {
    cedula: string;
}

export interface IGetExistenciaSuspensionViewModel {
    numeroSentencia: string ;
    cedula: string;
}

export interface IGetInsertarSuspensionViewModel {
    cedula: string;
    nombreCiudadano: string;
    codigoEstadoCiudadano: string;
    codigoInstitucion: string;
    numeroSentencia: string;
    duracion: string;
    codigoDuracion: string;
    fechaInicioSentencia: string;
    fechaFinSentencia: string;
    fuente: string;
    urlDocumentoSentencia: string;
    codigoTransaccion: string;
    codigoUsuario: string;
}

export interface IGetSuspensionesByEstadoViewModel {
    codigoEstadoCiudadano: string;
}

