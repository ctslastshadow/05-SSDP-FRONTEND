import { Injectable } from '@angular/core';
import { messages } from './messages';
import { IResponseStatusViewModel } from 'src/domain/general/i-response-status.viewModel';

@Injectable({ providedIn: 'root' })
export class StatusResponseService {
    constructor() { }

    error(httpErrorResponse: any): IResponseStatusViewModel {
        let { error, ok } = httpErrorResponse;
        console.log("httpErrorResponse", httpErrorResponse);
        let responseStatus: IResponseStatusViewModel = <IResponseStatusViewModel>{}
        if (httpErrorResponse.status == 502) {
            return { message: "Lo sentimos, estamos experimentando problemas técnicos temporales. El error 502 Bad Gateway indica dificultades en la conexión. Por favor, recarga la página o inténtalo más tarde.", statusCode: httpErrorResponse.status, ok }
        }
        if (error.StatusCode == 404 || error.StatusCode == 500) {
            responseStatus = { message: error.Message, statusCode: error.StatusCode, ok }
        }
        if (error.statusCode == 200 || error.statusCode == 400) {

            responseStatus = { message: error.message, statusCode: error.statusCode, ok }
        }
        if (error.status == 400) {
            responseStatus = { message: "Se produjeron uno o más errores de validación.", statusCode: httpErrorResponse.status, ok }
        }
        if (httpErrorResponse.status == 0) {
            responseStatus = { message: "Lo sentimos, actualmente estamos experimentando problemas técnicos y nuestro servidor no está disponible. Estamos trabajando diligentemente para resolver esta situación. Por favor, inténtalo de nuevo más tarde.", statusCode: httpErrorResponse.status, ok }
        }

        return responseStatus;
    }
}
