import { Mapper } from 'src/base/mapper';
import { ICiudadanoModel } from '../entities/ciudadano-model';
import { ICiudadanoViewModel } from 'src/domain/models/ciudadano.viewModel';


export class CitizenImplementationRepositoryMapper extends Mapper<ICiudadanoModel, ICiudadanoViewModel> {
    mapFrom(param: ICiudadanoModel): ICiudadanoViewModel {
        return {
            cedula:param.cedulaIdentidad,
            nombreCompleto: param.apellidosNombres,
            provincia: param.provinciaCiudadano,
            canton: param.cantonCiudadano,
            parroquia: param.parroquiaCiudadano,
            zona: param.zonaCiudadano,
        };
    }
    mapTo(param: ICiudadanoViewModel): ICiudadanoModel {
        return {
            cedulaIdentidad:param.cedula,
            apellidosNombres: param.nombreCompleto,
            provinciaCiudadano: param.provincia,
            cantonCiudadano: param.canton,
            parroquiaCiudadano: param.parroquia,
            zonaCiudadano: param.zona,
        }
    }
}
