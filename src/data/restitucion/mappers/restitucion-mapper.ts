import { AMapper } from "./a-mapper";
import { uid } from 'uid';

import { IGetSuspensionCiudadanoViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";
import { IGetSuspensionCiudadanoModel } from "../models/restitucion.model";

import { IGetInsertarRestitucionViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";
import { IGetInsertarRestitucionModel } from "../models/restitucion.model";

import { IGetVerificarSuspensionesActivasViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";
import { IGetVerificarSuspensionesActivasModel } from "../models/restitucion.model";

import { IGetActualizarEstadoSuspensionViewModel } from "src/domain/restitucion/viewModels/i-restitucion.viewModel";
import { IGetActualizarEstadoSuspensionModel } from "../models/restitucion.model";
export class restitucionMapper extends AMapper<any, any> {
    public clientIp: string;
    public clientBrowser: string;
    public process: number;
    public usercode: string;

    constructor() {
        super();
        this.clientIp = sessionStorage.getItem('clientIp') || '1.1.1.1';
        this.clientBrowser = sessionStorage.getItem('clientBrowser') || 'Navegador desconocido';
        this.process = parseInt(sessionStorage.getItem('process') || '500', 10);
        this.usercode= sessionStorage.getItem('usercode') || '9999';
    }


    mapGetSuspensionCiudadanoTo(param: IGetSuspensionCiudadanoViewModel): IGetSuspensionCiudadanoModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Consulta Suspensiones del Ciudadano ',
                servidor: 'backend.apps.cne.gob.ec'
            },
            cedula: param.cedula ?? '' ,
            codigoEstadoCiudadano: param.codigoEstadoCiudadano ?? '' 
        };
        console.log('body mapper mapGetSuspensionesCiudadanoTo ', body); 
        return body;
    }

    mapGetInsertarRestitucionTo(param: IGetInsertarRestitucionViewModel): IGetInsertarRestitucionModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process  ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'I',
                descripcionRequest: 'Consulta Insertar sentencia ',
                servidor: 'backend.apps.cne.gob.ec'
            },
            codigoSuspension: param.codigoSuspension ?? '',
            cedula: param.cedula ?? '',
            nombreCiudadano: param.nombreCiudadano ?? '',
            numeroSentencia: param.numeroSentencia ?? '',
            observacion: param.observacion ?? '',
            urlDocumentoRestitucion: param.urlDocumentoRestitucion ?? '',
            codigoTransaccion: param.codigoTransaccion ?? '',
            codigoUsuario: this.usercode ?? '' ,

        };
        console.log('body mapper mapGetInsertarRestitucionTo ', body);
        return body;
    }

 mapGetVerificarSuspensionesActivasTo(param: IGetVerificarSuspensionesActivasViewModel): IGetVerificarSuspensionesActivasModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process  ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Consulta Suspensiones Activas',
                servidor: 'backend.apps.cne.gob.ec'
            },
            cedula: param.cedula ?? ''

        };
        console.log('body mapper mapGetVerificarSuspensionesActivasTo ', body);
        return body;
    }


     mapGetModificarEstadoSuspensionTo(param: IGetActualizarEstadoSuspensionViewModel): IGetActualizarEstadoSuspensionModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process  ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'U',
                descripcionRequest: 'Actualizar Estado de la Suspensión',
                servidor: 'backend.apps.cne.gob.ec'
            },
            codigoSuspension: param.codigoSuspension ?? '',
            codigoEstadoCiudadano: param.codigoEstadoCiudadano ?? '',
            codigoTransaccion: param.codigoTransaccion ?? '',
            codigoUsuario: this.usercode ?? '' 
        };
        console.log('body mapper mapGetModificarEstadoSuspensionTo ', body);
        return body;
    }

}
