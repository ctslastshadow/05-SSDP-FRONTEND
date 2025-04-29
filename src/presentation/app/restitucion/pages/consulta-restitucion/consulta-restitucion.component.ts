import { Component } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';

@Component({
  selector: 'app-consulta-restitucion',
  templateUrl: './consulta-restitucion.component.html',
  styleUrls: ['./consulta-restitucion.component.scss']
})
export class ConsultaRestitucionComponent {
  cedula: string = '';
  resultado: any = null;
  displayedColumns: string[] = ['campo1', 'campo2']; 

 constructor(
    private alerts: AlertsService,
    public loader: LoaderService
  ) {}

    buscarInfoRestitucion  () {
    if (!this.validarCedulaEcuatoriana(this.cedula)) { 
      this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
      return;
    } else {
      console.log('Cédula válida. Procediendo a buscar información...');

      // Mostrar el loader
      this.loader.display(true);

      // Simulamos que se tarda en buscar
      setTimeout(() => {
        this.resultado = [
          { campo1: 'Nombre', campo2: 'Juan Perez' },
          { campo1: 'Dirección', campo2: 'Av. Siempre Viva 742' }
        ];

       
        this.loader.display(false);

        // Mensaje de éxito
        this.alerts.alertMessage('Búsqueda Exitosa', 'Información encontrada.', 'success');
      }, 500);
    }
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
