import { AMapper } from "./a-mapper";
import { uid } from 'uid';

import { IGetExistenciaSuspensionViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";
import { IGetExistenciaSuspensionModel} from "../models/suspension.model";

import { IGetDatosCiudadanoViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";
import { IGetDatosCiudadanoModel} from "../models/suspension.model";

import { IGetInsertarSuspensionViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";
import { IGetInsertarSuspensionModel } from "../models/suspension.model";

import { IGetSuspensionesByEstadoViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";
import { IGetSuspensionByEstadoModel } from "../models/suspension.model";

import { IGetGuardarAplicacionSuspensionViewModel } from "src/domain/suspension/viewModels/i-suspension.viewModel";
import { IGetGuardarAplicacionSuspensionModel  } from "../models/suspension.model";

export class suspensionMapper extends AMapper<any, any> {
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

    mapGetExistenciaSuspensionTo(param: IGetExistenciaSuspensionViewModel): IGetExistenciaSuspensionModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Consulta existenciaSuspension ',
                servidor: 'backend.apps.cne.gob.ec'
            },
            cedula: param.cedula ?? '' ,
            numeroSentencia: param.numeroSentencia ?? '' 
            
        };
        console.log('body mapper mapGetExistenciaSuspensionTo ', body); 
        return body;
    }

    mapGetDatosCiudadanoTo(param: IGetDatosCiudadanoViewModel): IGetDatosCiudadanoModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Consulta Datos Ciudadanos ',
                servidor: 'backend.apps.cne.gob.ec'
            },
            cedula: param.cedula ?? '' 
        };
        console.log('body mapper mapGetDatosCiudadanoTo ', body); 
        return body;
    }

    mapGetInsertarSentenciaTo(param: IGetInsertarSuspensionViewModel): IGetInsertarSuspensionModel {
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
            cedula: param.cedula ?? '',
            nombreCiudadano: param.nombreCiudadano ?? '',
            codigoEstadoCiudadano: param.codigoEstadoCiudadano ?? '',
            codigoInstitucion: param.codigoInstitucion ?? '',
            numeroSentencia: param.numeroSentencia ?? '',
            duracion: param.duracion ?? '',
            codigoDuracion: param.codigoDuracion ?? '',
            fechaInicioSentencia: param.fechaInicioSentencia ?? '',
            fechaFinSentencia: param.fechaFinSentencia ?? '',
            fuente: param.fuente ?? '',
            urlDocumentoSentencia: param.urlDocumentoSentencia ?? '',
            codigoTransaccion: param.codigoTransaccion ?? '',
            codigoUsuario: this.usercode ?? '' ,

        };
        console.log('body mapper mapGetInsertarSentenciaTo ', body);
        return body;
    }

    mapGetSentenciaByEstadoTo(param: IGetSuspensionesByEstadoViewModel): IGetSuspensionByEstadoModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Consulta Sentencias Por EstadoCiudadano',
                servidor: 'backend.apps.cne.gob.ec'
            },
            codigoEstadoCiudadano: param.codigoEstadoCiudadano ?? '' 
            
        };
        console.log('body mapper mapGetSuspensionesByEstadoTo ', body); 
        return body;
    }


     mapGetGuardarAplicacionSuspensionTo(param: IGetGuardarAplicacionSuspensionViewModel): IGetGuardarAplicacionSuspensionModel {
        // Crear el cuerpo completo con todos los campos
        let body = {
            auditoria: {
                usuario: this.usercode ?? '' ,
                proceso: this.process ,
                ip: this.clientIp ?? '' ,         
                navegador: this.clientBrowser ?? '' , 
                tipoRequest: 'C',
                descripcionRequest: 'Guardar Aplicación Suspensión',
                servidor: 'backend.apps.cne.gob.ec'
            },
            codigoEstadoCiudadano: param.codigoEstadoCiudadano ?? '',
            codigoSuspension: param.codigoSuspension ?? '',
            tipoTramite: param.tipoTramite ?? '',
            codigoRegistroElectoral: param.codigoRegistroElectoral ?? '',
            observacion: param.observacion ?? '',
            codigoTransaccion: param.codigoTransaccion ?? '',
            codigoUsuario:this.usercode ?? '' ,
            
        };
        console.log('body mapper mapGetGuardarAplicacionSuspensionTo ', body); 
        return body;
    }

}
