import { Component, ViewChild, OnInit } from '@angular/core';
import { DxValidationGroupComponent, DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { from, of } from 'rxjs';
import { concatMap, map, catchError, toArray } from 'rxjs/operators';
import { IGetSuspensionesByEstadoViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetSuspensionByEstadoUseCase } from 'src/domain/suspension/useCases/get-suspensionesByEstado.useCase';

import { IGetVerificarSuspensionesActivasViewModel } from 'src/domain/restitucion/viewModels/i-restitucion.viewModel';
import { GetVerificarSuspensionesActivasUseCase } from 'src/domain/restitucion/useCases/get-verificarSuspensionesActivas.useCase';

import { IGetActualizarEstadoSuspensionViewModel } from 'src/domain/restitucion/viewModels/i-restitucion.viewModel';
import { GetActualizarEstadoSuspensionUseCase } from 'src/domain/restitucion/useCases/get-actualizarEstadoSuspension.useCase';


@Component({
  selector: 'app-aplicacion-restitucion',
  templateUrl: './aplicacion-restitucion.component.html',
  styleUrls: ['./aplicacion-restitucion.component.scss']
})
export class AplicacionRestitucionComponent implements OnInit {
  @ViewChild('validationGroupRef', { static: false })
  validationGroup!: DxValidationGroupComponent;
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  // Listado de Restituciones INGRESADAS
  exportFileName: string;
  resultado: any[] = [];
  esErrorDataRestitucion = false;
  mostrarTablaRestitucion = false;
  mostrarMensajeDataRestitucion = false;
  mensajeDataRestitucion = '';

    // Popup
  popupVisible = false;
  summaryResults: { cedula: string; info: string; message: string }[] = [];
  summaryMessage = '';


  constructor(
    private alerts: AlertsService,
    public loaderMain: LoaderService,
    private _getSRestitucionByEstadoUseCase: GetSuspensionByEstadoUseCase,
     private _getVerificarSuspensionesActivasUseCase: GetVerificarSuspensionesActivasUseCase,
      private _getActualizarEstadoSuspensionUseCase: GetActualizarEstadoSuspensionUseCase
  ) {this.exportFileName = this.buildExportFileName();}

    private buildExportFileName(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `Reporte_Restituciones_Ingresadas_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  ngOnInit(): void {
    this.buscarInfoRestitucion();
  }

  buscarInfoRestitucion(): void {
    const body: IGetSuspensionesByEstadoViewModel = {
      codigoEstadoCiudadano: '4' // Estado a consultar
    };

    this.loaderMain.display(true);

    this._getSRestitucionByEstadoUseCase.getSuspensionByEstado(body).subscribe({
      next: (resp: any) => {
        if (resp && resp.ok === false) {
          this.resultado = [];
          this.alerts.alertMessage('Error', resp.message, 'error');
          return;
        }

        if (Array.isArray(resp) && resp.length > 0 && resp[0].info === 'OK') {
          this.resultado = resp;
          this.mostrarTablaRestitucion = true;
        } else {
          this.resultado = [];
          this.mostrarTablaRestitucion = false;
          this.alerts.alertMessage('Información', 'No existen ingresos de Restituciones registradas.', 'info');
        }
      },
      error: () => {
        this.resultado = [];
        this.mostrarTablaRestitucion = false;
        this.alerts.alertMessage('Error', 'No se pudo consultar las Restituciones Ingresadas. Error del servidor.', 'error');
      },
      complete: () => {
        this.loaderMain.display(false);
        this.mostrarMensajeDataRestitucion = true;
      }
    });
  }

   private generarCodigoTransaccion(codigo: number | string): string {
    const base64 = btoa(codigo.toString());
    const clean = base64.replace(/[^A-Z0-9]/gi, '').substring(0, 10);
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${clean}-${rand}`;
  }

 /** Simula la llamada a registro electoral */
  private applicationRegistroElectoral(cedula: string) {
    // simula un Observable que devuelve un array con info OK
    return of([{ info: 'OK', mensaje: 'Ciudadano Restituído correctamente' }]);
  }

procesarSeleccionados(): void {
  this.loaderMain.display(true);

  // 1) obtenemos directamente el array de filas seleccionadas
  const rows: any[] = this.dataGrid.instance.getSelectedRowsData();

  if (!rows.length) {
    this.loaderMain.display(false);
    this.alerts.alertMessage('Atención', 'No hay filas seleccionadas.', 'warning');
    return;
  }

  // 2) creamos un flujo RxJS a partir del array
  from(rows).pipe(
    concatMap(row =>
      this._getVerificarSuspensionesActivasUseCase
        .getVerificarSuspensionesActivas({ cedula: row.cedula })
        .pipe(
          concatMap(respVerif => {
            // normalizamos la respuesta
            const primero = Array.isArray(respVerif) ? respVerif[0] : (respVerif as any);
            const info = primero.info;
            const mensaje = primero.mensaje;

            if (info === 'NOT_FOUND') {
              return this.applicationRegistroElectoral(row.cedula).pipe(
                concatMap(respReg => {
                  const reg = Array.isArray(respReg) ? respReg[0] : (respReg as any);
                  return this._getActualizarEstadoSuspensionUseCase
                    .getActualizarEstadoSuspension({
                      codigoSuspension: row.codigoSuspension,
                      codigoEstadoCiudadano: '5', //según lo que responda RE
                      codigoTransaccion: this.generarCodigoTransaccion(row.codigoSuspension),
                      codigoUsuario: sessionStorage.getItem('usercode') || '9999'
                    })
                    .pipe(
                      map(() => ({
                        cedula: row.cedula,
                        info: reg.info,
                        message: reg.mensaje
                      }))
                    );
                })
              );
            } else {
              // con suspensiones activas → solo actualizamos a estado 6
              return this._getActualizarEstadoSuspensionUseCase
                .getActualizarEstadoSuspension({
                  codigoSuspension: row.codigoSuspension,
                  codigoEstadoCiudadano: '7',
                  codigoTransaccion: this.generarCodigoTransaccion(row.codigoSuspension),
                  codigoUsuario: sessionStorage.getItem('usercode') || '9999'
                })
                .pipe(
                  map(() => ({
                    cedula: row.cedula,
                    info,
                    message: mensaje
                  }))
                );
            }
          }),
          catchError(() =>
            of({
              cedula: row.cedula,
              info: 'ERROR',
              message: 'Error procesando ciudadano'
            })
          )
        )
    ),
    toArray()
  ).subscribe({
    next: summary => {
      this.summaryResults = summary;
      const total = summary.length;
      const restituidos = summary.filter(r => r.info === 'OK' && r.message.includes('Restituído')).length;
      const conSusp = summary.filter(r => r.info === 'OK' && r.message.includes('suspension')).length;
      this.summaryMessage = `Procesados: ${total}.  
      Restituidos correctamente: ${restituidos}.  
      Con suspensiones activas: ${conSusp}.`;
      this.popupVisible = true;
      this.buscarInfoRestitucion();
      this.loaderMain.display(false);
    },
    error: () => {
      this.loaderMain.display(false);
      this.alerts.alertMessage('Error', 'Ocurrió un fallo al procesar las filas.', 'error');
    }
  });
}



}
