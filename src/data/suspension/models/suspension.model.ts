import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";


///////////////////Verificar la existencia de la Sentencia////////////////////
//Respuesta esperada del endpoint
export interface IExistenciaSuspensionRsViewModel extends IResponseStatusViewModel {
    data?: IExistenciaSuspensionViewModel[];

}
export interface IExistenciaSuspensionViewModel {
    info: string | null;
    mensaje: string | null;
}

//Modelo de Ingreso de datos
export interface IGetExistenciaSuspensionModel {
    auditoria: {
        usuario: string;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    numeroSentencia: string;
    cedula: string;
}

////////////////////////Listar datos del ciudadano/////////////////////
//Respuesta esperada del endpoint


export interface IListarDatosCiudadanoRsViewModel extends IResponseStatusViewModel {
    data?: IListarDatosCiudadanoViewModel[];

}
export interface IListarDatosCiudadanoViewModel {
    nombre: string | null;
    condicionCiudadano: string | null;
    info: string | null;
    mensaje: string | null;
}

//Modelo de Ingreso de datos
export interface IGetDatosCiudadanoModel {
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
}



/////////////////////////Insertar la Sentencia////////////////////////
//Respuesta esperada del endpoint
export interface IInsertarSuspensionRsViewModel extends IResponseStatusViewModel {
    data?: IIngresarSuspensionViewModel[];

}
export interface IIngresarSuspensionViewModel {
    info: string | null;
    mensaje: string | null;
}

//Modelo de Ingreso de datos
export interface IGetInsertarSuspensionModel {
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
    nombreCiudadano: string;
    codigoEstadoCiudadano: string;
    codigoInstitucion: string;
    numeroSentencia: string;
    duracion: string;
    codigoDuracion: string;
    fechaInicioSentencia: string;
    fuente: string;
    urlDocumentoSentencia: string;
    codigoTransaccion: string;
    codigoUsuario: string;
}


/////////////////////////Seleccionar la Suspension por estado////////////////////////
//Respuesta esperada del endpoint
export interface ISuspensionByEstadoRsViewModel extends IResponseStatusViewModel {
    data?: ISuspensionByEstadoViewModel[];

}
export interface ISuspensionByEstadoViewModel {
    nombre: string | null;
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
    info: string | null;

}

//Modelo de Ingreso de datos
export interface IGetSuspensionByEstadoModel {
    auditoria: {
        usuario: string;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    codigoEstadoCiudadano: string;
}


/////////////////////////Guardar la Aplicación de Suspension////////////////////////

//Respuesta esperada del endpoint
export interface IGuardarAplicacionSuspensionRsViewModel extends IResponseStatusViewModel {
    data?: IGuardarAplicacionSuspensionViewModel[];
}
export interface IGuardarAplicacionSuspensionViewModel { 
    info: string | null;
    mensaje: string | null;
}

//Modelo de Ingreso de datos
export interface IGetGuardarAplicacionSuspensionModel {
    auditoria: {
        usuario: string;
        proceso: number;
        ip: string;
        navegador: string;
        tipoRequest: string;
        descripcionRequest: string;
        servidor: string;
    };
    codigoEstadoCiudadano: string;
    codigoSuspension: string;
    tipoTramite: string;
    codigoRegistroElectoral: string;
    observacion: string;
    codigoTransaccion: string;
    codigoUsuario: string;
}

