import { Component, ViewChild, OnInit } from '@angular/core';
import { DxValidationGroupComponent, DxDataGridComponent } from 'devextreme-angular';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, switchMap, map, catchError } from 'rxjs/operators';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { IGetSuspensionesByEstadoViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetSuspensionByEstadoUseCase } from 'src/domain/suspension/useCases/get-suspensionesByEstado.useCase';
import { IGetGuardarAplicacionSuspensionViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetGuardarAplicacionSuspensionUseCase } from 'src/domain/suspension/useCases/get-guardarAplicacionSuspension.useCase';

@Component({
  selector: 'app-aplicacion-suspension',
  templateUrl: './aplicacion-suspension.component.html',
  styleUrls: ['./aplicacion-suspension.component.scss']
})
export class AplicacionSuspensionComponent implements OnInit {
  @ViewChild('validationGroupRef', { static: false }) validationGroup!: DxValidationGroupComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  exportFileName: string;
  resultado: any[] = [];
  mostrarTablaSuspension = false;
  mostrarMensajeDataSuspension = false;

  // Popup
  popupVisible = false;
  summaryResults: { cedula: string; info: string; message: string }[] = [];
  summaryMessage = '';

  constructor(
    private alerts: AlertsService,
    public loaderMain: LoaderService,
    private _getSuspensionByEstadoUseCase: GetSuspensionByEstadoUseCase,
    private _getGuardarAplicacionSuspensionUseCase: GetGuardarAplicacionSuspensionUseCase
  ) {
    this.exportFileName = this.buildExportFileName();
  }

  ngOnInit(): void {
    this.buscarInfoSuspensionesIngresadas();
  }

  private buildExportFileName(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `Reporte_Suspensiones_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  buscarInfoSuspensionesIngresadas(): void {
    const body: IGetSuspensionesByEstadoViewModel = { codigoEstadoCiudadano: '1' };
    this.loaderMain.display(true);
    this._getSuspensionByEstadoUseCase.getSuspensionByEstado(body).subscribe({
      next: resp => {
        if (resp && resp.ok === false) {
          this.alerts.alertMessage('Error', resp.message, 'error');
          this.resultado = [];
        } else if (Array.isArray(resp) && resp.length && resp[0].info === 'OK') {
          this.resultado = resp;
          this.mostrarTablaSuspension = true;
        } else {
          this.resultado = [];
          this.mostrarTablaSuspension = false;
          this.alerts.alertMessage('Información', 'No hay suspensiones registradas.', 'info');
        }
      },
      error: () => {
        this.alerts.alertMessage('Error', 'Error al consultar suspensiones.', 'error');
        this.resultado = [];
        this.mostrarTablaSuspension = false;
      },
      complete: () => this.loaderMain.display(false)
    });
  }
procesarSeleccionados(): void {
  // en vez de:
  // const selected = this.dataGrid.selectedRowKeys;
  // usa:
  const selected: any[] = this.dataGrid.instance.getSelectedRowsData();

  const calls: Observable<{ cedula: string; info: string; message: string }>[] =
    selected.map(item =>
      this.llamarServicioRegistroElectoral(item).pipe(
        switchMap(electResp => {
          const estado = electResp.info === 'OK' ? '2' : '3';
          const bodyGuardar: IGetGuardarAplicacionSuspensionViewModel = {
            codigoEstadoCiudadano: estado,
            codigoSuspension: item.codigoSuspension,
            tipoTramite: 'S',
            codigoRegistroElectoral: electResp.codRegElect,
            observacion: electResp.message,
            codigoTransaccion: this.generarCodigoTransaccion(item.codigoSuspension),
            codigoUsuario: sessionStorage.getItem('usercode') || '9999'
          };

          return this._getGuardarAplicacionSuspensionUseCase
            .getGuardarAplicacionSuspension(bodyGuardar)
            .pipe(
              map(() => ({
                cedula: item.cedula,
                info: electResp.info,
                message: electResp.info === 'OK'
                  ? 'GUARDADO CORRECTAMENTE'
                  : 'REG ELECTORAL NO MODIFICADO'
              })),
              catchError(() => of({
                cedula: item.cedula,
                info: 'ERROR_GUARDAR',
                message: 'Error al guardar aplicación'
              }))
            );
        }),
        catchError(() => of({
          cedula: item.cedula,
          info: 'ERROR',
          message: 'Error interno al procesar'
        }))
      )
    );

  this.loaderMain.display(true);
  forkJoin(calls).subscribe(
    results => {
      this.summaryResults = results;
      const total = results.length;
      const success = results.filter(r => r.info === 'OK').length;
      const errors = total - success;
      this.summaryMessage = `Se procesaron ${total} registros: ${success} correctos, ${errors} incorrectos`;
      this.loaderMain.display(false);
      this.popupVisible = true;
      // Recargar el grid
      this.buscarInfoSuspensionesIngresadas();
      this.dataGrid.instance.clearSelection();
    },
    err => {
      this.loaderMain.display(false);
      this.alerts.alertMessage('Error', 'Error al procesar registros.', 'error');
    }
  );
}

  private llamarServicioRegistroElectoral(item: any): Observable<{ info: string; message: string; codRegElect: string }> {
    // Simulación de respuesta con retardo
    const ok = Math.random() > 0.5;
    const resp = { info: ok ? 'OK' : 'OK_NA', message: ok ? 'INGRESADO RE MODIFICADO' : 'APLICADO - RE NO MODIFICADO', codRegElect: ok ? '99' : '88' };
    return of(resp).pipe(delay(Math.random() * 500 + 300));
  }

  private generarCodigoTransaccion(codigo: number | string): string {
    const base64 = btoa(codigo.toString());
    const clean = base64.replace(/[^A-Z0-9]/gi, '').substring(0, 10);
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${clean}-${rand}`;
  }
}
