import { Component, ViewChild, OnInit } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { IGetSuspensionesByEstadoViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetSuspensionByEstadoUseCase } from 'src/domain/suspension/useCases/get-suspensionesByEstado.useCase';

@Component({
  selector: 'app-aplicacion-restitucion',
  templateUrl: './aplicacion-restitucion.component.html',
  styleUrls: ['./aplicacion-restitucion.component.scss']
})
export class AplicacionRestitucionComponent implements OnInit {
  @ViewChild('validationGroupRef', { static: false })
  validationGroup!: DxValidationGroupComponent;

  // Listado de Restituciones INGRESADAS
  resultado: any[] = [];
  esErrorDataRestitucion = false;
  mostrarTablaRestitucion = false;
  mostrarMensajeDataRestitucion = false;
  mensajeDataRestitucion = '';

  constructor(
    private alerts: AlertsService,
    public loaderMain: LoaderService,
    private _getSRestitucionByEstadoUseCase: GetSuspensionByEstadoUseCase
  ) {}

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

  aplicarRestitucionRegElect(sentencia: string): void {
    // Lógica para la restitución de suspensión electoral
  }
}
