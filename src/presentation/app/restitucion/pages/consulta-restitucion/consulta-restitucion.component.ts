import { Component,ViewChild } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { GetSuspensionCiudadanoUseCase } from 'src/domain/restitucion/useCases/get-suspensionCiudadano.useCase';
import { IGetSuspensionCiudadanoViewModel } from 'src/domain/restitucion/viewModels/i-restitucion.viewModel';

import { IGetInsertarRestitucionViewModel } from 'src/domain/restitucion/viewModels/i-restitucion.viewModel';
import {  GetInsertarRestitucionUseCase } from 'src/domain/restitucion/useCases/get-insertarRestitucion.useCase';


import { DxFileUploaderComponent } from 'devextreme-angular';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from "src/environments/environment.development";
import { ARepositoryService } from 'src/domain/archivos_sentencia/services/a-archivos_sentencia-service';

@Component({
  selector: 'app-consulta-restitucion',
  templateUrl: './consulta-restitucion.component.html',
  styleUrls: ['./consulta-restitucion.component.scss']
})
export class ConsultaRestitucionComponent {
   @ViewChild('validationGroupRef', { static: false }) validationGroup!: DxValidationGroupComponent;
    @ViewChild('uploaderRef', { static: false }) uploaderComponent!: DxFileUploaderComponent;

  private baseFileUrl: string = environment.apiFileServer;
  cedula: string = '';
  codSentenciaPrevia: number = 0;
  resultado: any[] = [];
  mostrarPdfPopup: boolean = false;

 // ListadoSuspension
  public mostrarTablaSuspension: boolean = false;
  public mostrarMensajeDataSuspension: boolean = false;
  public mensajeDataSuspension: string = '';
  esErrorDataSuspension: boolean = false;
  maskCedulaRules = { '0': new RegExp('\\d') };
    // Control del modal
  mostrarFormularioIngresoRestitucion: boolean = false;
  IsSuspensionIngresada: boolean = false;
  restitucionArchivoValido: boolean = false;
  // Modelo del formulario
  restitucionINGRESO = {
    codSuspension: 0 as number,
    cedula: '' as string ,
    nombre: '' as string ,
    numSentencia:'' as string ,
    observacion:'' as string,
    urlPdf: '' as string ,
  };

  // Archivo
  restitucionArchivo: File | null = null;

pdfUrl: SafeResourceUrl | null = null;
  constructor(
    private alerts: AlertsService,
    public loaderMain: LoaderService,
     private sanitizer: DomSanitizer,
    private _getSuspensionCiudadanoUseCase: GetSuspensionCiudadanoUseCase,
     private _getInsertarRestitucionUseCase: GetInsertarRestitucionUseCase,
     private repositoryService: ARepositoryService 
  ) {}

 buscarInfoRestitucion() {
  if (!this.validarCedulaEcuatoriana(this.cedula)) {
    this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
    return;
  }

  const body: IGetSuspensionCiudadanoViewModel = {
    cedula: this.cedula,
    codigoEstadoCiudadano: '1'
  };

  this.loaderMain.display(true);

  this._getSuspensionCiudadanoUseCase.getSuspensionCiudadano(body).subscribe({
    next: (resp: any) => {

      if (resp && resp.ok === false) {
        this.resultado = [];
        this.alerts.alertMessage('Error', resp.message, 'error');
        return;
      }

      if (Array.isArray(resp) && resp.length > 0 && resp[0].info === 'OK') {
        this.resultado = resp;
        this.alerts.alertMessage('Búsqueda Exitosa', 'Suspensiones encontradas.', 'success');
      } else {
        this.resultado = [];
        this.alerts.alertMessage('Información', 'No existen suspensiones registradas.', 'info');
      }
    },
    error: (err) => {
      this.resultado = [];
      this.alerts.alertMessage('Error', 'No se pudo consultar las suspensiones. Error del servidor.', 'error');
    },
    complete: () => this.loaderMain.display(false)
  });
}

 cargarInfoRestitucion() {
  if (!this.validarCedulaEcuatoriana(this.cedula)) {
    this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
    return;
  }

  const body: IGetSuspensionCiudadanoViewModel = {
    cedula: this.cedula,
    codigoEstadoCiudadano: '1'
  };

  this.loaderMain.display(true);

  this._getSuspensionCiudadanoUseCase.getSuspensionCiudadano(body).subscribe({
    next: (resp: any) => {

      if (resp && resp.ok === false) {
        this.resultado = [];
        this.alerts.alertMessage('Error', resp.message, 'error');
        return;
      }

      if (Array.isArray(resp) && resp.length > 0 && resp[0].info === 'OK') {
        this.resultado = resp;
      } else {
        this.resultado = [];
        this.alerts.alertMessage('Información', 'No existen suspensiones registradas.', 'info');
      }
    },
    error: (err) => {
      this.resultado = [];
      this.alerts.alertMessage('Error', 'No se pudo consultar las suspensiones. Error del servidor.', 'error');
    },
    complete: () => this.loaderMain.display(false)
  });
}


 verPDF(path: string): void {
  const url = `${this.baseFileUrl}Get?file=${encodeURIComponent(path)}`;
  console.log('📄 URL del documento:', url);
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  this.mostrarPdfPopup = true;
}

cerrarPDF(): void {
  this.mostrarPdfPopup = false;
  this.pdfUrl = null;
}

 cargarDataRestitucionForm(data: any) {
    this.limpiarFormIngreso();
    this.IsSuspensionIngresada=true;
    this.mostrarFormularioIngresoRestitucion=true;
    this.restitucionINGRESO = {
      codSuspension: data.codigoSuspension|| 0,
      cedula: this.cedula,
      nombre: data.nombreCiudadano || '',
      numSentencia: data.numeroSentencia || '',
      observacion:'',
      urlPdf: '' as string ,
    };

  }

generarCodigoTransaccion(sentencia: string): string {
  const base64 = btoa(unescape(encodeURIComponent(sentencia))); 
  const clean = base64.replace(/[^A-Z0-9]/gi, '').substring(0, 10); 
  const aleatorio = Math.random().toString(36).substring(2, 8).toUpperCase(); 
  return `${clean}-${aleatorio}`;
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

soloNumeros(e: any): void {
  e.event.target.value = e.event.target.value.replace(/\D/g, '').slice(0, 10);
  this.cedula = e.event.target.value;
}

  onArchivoSeleccionado(e: any): void {
  const files = e.value;
  if (!files || files.length === 0) {
    this.restitucionArchivo = null;
    this.restitucionArchivoValido = false;
    return;
  }

  const archivo = files[0];
  if (archivo.size > 2 * 1024 * 1024) {
    this.restitucionArchivo = null;
    this.restitucionArchivoValido = false;
    if (this.uploaderComponent?.instance) {
      this.uploaderComponent.instance.reset();
    }
    return;
  }

  this.restitucionArchivo = archivo;
  this.restitucionArchivoValido = false;
}


  limpiarFormIngreso() {
    this.restitucionINGRESO.urlPdf = '';  // Limpiar el archivo PDF cargado
    this.restitucionArchivo = null; 
    this.restitucionINGRESO.cedula = '';
    this.restitucionINGRESO.nombre = '';
    this.restitucionINGRESO.numSentencia = '';
    this.restitucionINGRESO.observacion = '';
    this.restitucionINGRESO.codSuspension = 0;

    if (this.uploaderComponent) {
      this.uploaderComponent.instance.reset();
    }
  }

   // Cancelar y cerrar modal
    cancelarFormIngreso() {
      this.mostrarFormularioIngresoRestitucion = false;
      
    }


   ingresarRestitucion() {
  const result = this.validationGroup.instance.validate();
  if (!result.isValid) return;

  if (!this.restitucionArchivo) {
    this.restitucionArchivoValido = true;
    return;
  }

  this.loaderMain.display(true);

  this.repositoryService.uploadFile(this.restitucionArchivo, 'SDP/RESTITUCION').subscribe({
    next: (uri) => {
      if (!uri) {
        throw new Error('❌ El servidor no devolvió una URI válida.');
      }

      // Asignamos la URI al modelo
      this.restitucionINGRESO.urlPdf = uri;
      console.log('✅ URI recibida:', uri);

      // Llamar aquí al método que hace el insert de restitución
      this.enviarDatosRestitucion();

    },
    error: (err) => {
      console.error('❌ Error al subir archivo:', err);
      this.alerts.alertMessage('Error', 'Algo salió mal, por favor Intertar más tarde.', 'error');
      this.loaderMain.display(false);
    }
  });
}

enviarDatosRestitucion() {
  const body:IGetInsertarRestitucionViewModel = {
    codigoSuspension: this.restitucionINGRESO.codSuspension,
    cedula: this.restitucionINGRESO.cedula,
    nombreCiudadano: this.restitucionINGRESO.nombre,
    numeroSentencia: (this.restitucionINGRESO.numSentencia || '').trim(),
    observacion: this.restitucionINGRESO.observacion,
    urlDocumentoRestitucion: this.restitucionINGRESO.urlPdf,
    codigoUsuario: sessionStorage.getItem('usercode') || '9999',
    codigoTransaccion: this.generarCodigoTransaccion(this.restitucionINGRESO.numSentencia), 
   
  };
 console.log('Datos a enviar PASO FINAL:',body);
  this._getInsertarRestitucionUseCase.getInsertarRestitucion(body).subscribe({
    next: (resp) => {
       if (!Array.isArray(resp) || resp.length === 0) {
        this.alerts.alertMessage('Atención', 'No se recibió una respuesta válida del servicio Ingreso Suspensión.', 'info');
        return;
      }
    const resultado = resp[0];
      console.error('Resultado:', resultado);
    if(resultado.info='OK'){
       this.alerts.alertMessage('Información', resultado.mensaje ?? 'Restitucion Ingresada Correctament.', 'success');
    }
      this.mostrarFormularioIngresoRestitucion = false;
      this.limpiarFormIngreso();
      this.cargarInfoRestitucion();
      this.loaderMain.display(false);
   },
    error: (err) => {
      console.error('Error al guardar restitución:', err);
     this.alerts.alertMessage('Error', 'No se pudo registrar la restitución.', 'error');
      this.loaderMain.display(false);
     }
   });
}

}



