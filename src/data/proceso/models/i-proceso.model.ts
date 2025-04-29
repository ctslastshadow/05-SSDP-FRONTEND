import { IResponseStatusModel } from "src/data/general/models/i-response-status.model";

export interface IArchivoModel {
  codigoArchivo: number | null;
  tipoArchivo?: number | null;
  descripcion?: string | null;
  nombre: string | null;
  documento?: string | null;
}

export interface IProcesoAllRsModel extends IResponseStatusModel  {
  data?: IProcesoAllModel[] | null;
}
export interface IProcesoAllModel {
  codigoTipoProceso: number | null;
  tipoProceso: string | null;
  imagenProceso: string | null;
  descripcionProceso: string | null;
}
