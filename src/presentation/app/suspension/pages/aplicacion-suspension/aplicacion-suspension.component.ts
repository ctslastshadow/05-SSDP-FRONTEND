import { Component, ViewChild, OnInit } from '@angular/core';
import { DxValidationGroupComponent,DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { IGetSuspensionesByEstadoViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetSuspensionByEstadoUseCase } from 'src/domain/suspension/useCases/get-suspensionesByEstado.useCase';
import { forkJoin, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-aplicacion-suspension',
  templateUrl: './aplicacion-suspension.component.html',
  styleUrls: ['./aplicacion-suspension.component.scss']
})
export class AplicacionSuspensionComponent implements OnInit {
  @ViewChild('validationGroupRef', { static: false })
  validationGroup!: DxValidationGroupComponent;
   @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  exportFileName: string;
  // Listado de Suspensiones INGRESADAS
  resultado: any[] = [];
  esErrorDataSuspension = false;
  mostrarTablaSuspension = false;
  mostrarMensajeDataSuspension = false;
  mensajeDataSuspension = '';

   // Para procesar selección
  popupVisible = false;
  summaryResults: { cedula: string; info: string; message: string; }[] = [];
  summaryMessage = '';
  constructor(
    private alerts: AlertsService,
    public loaderMain: LoaderService,
    private _getSuspensionByEstadoUseCase: GetSuspensionByEstadoUseCase,
  ) {
    this.exportFileName = this.buildExportFileName()
    }

  ngOnInit(): void {
    
    this.buscarInfoSuspensionesIngresadas();
  }

  private buildExportFileName(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const y = now.getFullYear();
    const m = pad(now.getMonth() + 1);
    const d = pad(now.getDate());
    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    // ej. "Reporte_Suspensiones_20250521_144530"
    return `Reporte_Suspensiones_Ingresadas_${y}${m}${d}_${hh}${mm}${ss}`;
  }

  buscarInfoSuspensionesIngresadas(): void {
    const body: IGetSuspensionesByEstadoViewModel = {
      codigoEstadoCiudadano: '1' // Estado a consultar
    };

    this.loaderMain.display(true);

    this._getSuspensionByEstadoUseCase.getSuspensionByEstado(body).subscribe({
      next: (resp: any) => {
        if (resp && resp.ok === false) {
          this.resultado = [];
          this.alerts.alertMessage('Error', resp.message, 'error');
          return;
        }

        if (Array.isArray(resp) && resp.length > 0 && resp[0].info === 'OK') {
          this.resultado = resp;
          this.mostrarTablaSuspension = true;
        } else {
          this.resultado = [];
          this.mostrarTablaSuspension = false;
          this.alerts.alertMessage('Información', 'No existen Suspensiones ingresadas registradas.', 'info');
        }
      },
      error: () => {
        this.resultado = [];
        this.mostrarTablaSuspension = false;
        this.alerts.alertMessage('Error', 'No se pudo consultar las suspensiones. Error del servidor.', 'error');
      },
      complete: () => {
        this.loaderMain.display(false);
        this.mostrarMensajeDataSuspension = true;
      }
    });
  }

   procesarSeleccionados(): void {
    const selected = this.dataGrid.selectedRowKeys;
    const calls: Observable<{ info: string; message: string }>[]= [];

    selected.forEach((item: any) => {
      calls.push(this.llamarServicioRegistroElectoral(item));
    });

    this.loaderMain.display(true);
    forkJoin(calls).subscribe(
      (responses: any[]) => {
        this.summaryResults = responses.map((resp, idx) => ({
          cedula: selected[idx].cedula,
          info: resp.info,
          message: resp.message
        }));

        const total = responses.length;
        const successCount = responses.filter(r => r.info === 'OK').length;
        const errorCount = total - successCount;
        this.summaryMessage = `Se procesaron al registro Electoral ${total} registros: ${successCount} Correctos, ${errorCount} Incorrectos`;

        this.loaderMain.display(false);
        this.popupVisible = true;
      },
      () => {
        this.loaderMain.display(false);
        this.alerts.alertMessage('Error', 'Error al procesar registros.', 'error');
      }
    );
  }

   llamarServicioRegistroElectoral(item: any): Observable<{info: string, message: string}> {
    // Simulación aleatoria con retardo de entre 300 y 800 ms
    const isOk = Math.random() > 0.5;
    const response = {
      info: isOk ? 'OK' : 'N/A',
      message: isOk ? 'INGRESADO CORRECTAMENTE' : 'NO SE PUDO ACTUALIZAR EL REGISTRO ELECTORAL'
    };
    const randomDelay = Math.floor(300 + Math.random() * 500);
    return of(response).pipe(delay(randomDelay));
  }



}
