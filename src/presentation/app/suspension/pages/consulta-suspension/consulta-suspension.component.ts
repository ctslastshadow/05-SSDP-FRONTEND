import { Component } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';

import { IGetSentenciasRegistroViewModel } from 'src/domain/consJudicatura/viewModels/i-sentencias.viewModel';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';

@Component({
  selector: 'app-consulta-suspension',
  templateUrl: './consulta-suspension.component.html',
  styleUrls: ['./consulta-suspension.component.scss']
})
export class ConsultaSuspensionComponent {
  cedula: string = '';
  resultado: any = null;
  displayedColumns: string[] = ['campo1', 'campo2']; 

  public dataJudicatura: any[] = [];

  constructor(
    private alerts: AlertsService,
    public loader: LoaderService,
    private _getCJudicaturaUseCase: GetCJudicaturaUseCase
  ) {}

  buscarInfoSuspension() {
    if (!this.validarCedulaEcuatoriana(this.cedula)) { 
      this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
      return;
    } else { 
      // Mostrar el loader
      this.loader.display(true);

      this.getCJSentenciasCedula()
      
      setTimeout(() => {
        this.resultado = [
          { campo1: 'Nombre', campo2: 'Juan Perez' },
          { campo1: 'Dirección', campo2: 'Av. Siempre Viva 742' }
        ];

       
        this.loader.display(false);

        this.alerts.alertMessage('Búsqueda Exitosa', 'Información encontrada.', 'success');
      }, 500);
    }
  }

 //metodo para buscar las sentencias del consejo de la Judicatura
  public async getCJSentenciasCedula() {
    let body: IGetSentenciasRegistroViewModel = {
      cedula: this.cedula,
      sentencia: ""
    }

    const result = await this._getCJudicaturaUseCase.getCJSentenciasCedula(body).toPromise();

    this.dataJudicatura = result!.data!;
    console.log('result ', result)
  }

  validarCedulaEcuatoriana(cedula: string): boolean {
    if (cedula.length !== 10) return false;
    const digitos = cedula.split('').map(d => parseInt(d, 10));
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || (provincia > 24 && provincia !== 30)) return false;
    const tercerDigito = digitos[2];
    if (tercerDigito >= 6) return false;

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let valor = digitos[i] * coeficientes[i];
      if (valor >= 10) valor -= 9;
      suma += valor;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === digitos[9];
  }

}