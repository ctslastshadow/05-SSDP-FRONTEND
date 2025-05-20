import { IResponseStatusViewModel } from "src/domain/general/i-response-status.viewModel";

export interface IRCivilRsViewModel extends IResponseStatusViewModel {
    data?: IRCivilViewModel[];

}

//lo que viene
export interface IRCivilViewModel {
    actaDefuncion: string | null;
    callesDomicilio: string | null;
    cedula: string | null;
    condicionCiudadano: string | null;
    domicilio: string | null;
    fechaDefuncion: string | null;
    fechaExpiracion: string | null;
    fechaInscripcionDefuncion: string | null;
    fechaNacimiento: string | null;
    lugarNacimiento: string | null;
    nacionalidad: string | null;
    nombre: string | null;
    profesion: string | null;
}

//lo que sale
export interface IGetRegistroCivilModel {
        cedula: string;
        usuario: string;
        proceso: string;
        ip: string;
        navegador: string;
        servidor: string;
        modulo: string;
      }




