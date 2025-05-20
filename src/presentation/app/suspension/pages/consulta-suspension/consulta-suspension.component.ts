import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { LoaderMainService } from 'src/base/loaderMain.service';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { uid } from 'uid';

import { IGetSentenciasRegistroViewModel } from 'src/domain/consJudicatura/viewModels/i-sentencias.viewModel';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';

import { IGetRegistroCivilViewModel } from 'src/domain/regCivil/viewModels/i-regCivil.viewModel';
import { GetRCivilUseCase } from 'src/domain/regCivil/useCases/get-regCivil.useCase';


import { IGetExistenciaSuspensionViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import { GetExistenciaSuspensionUseCase } from 'src/domain/suspension/useCases/get-existenciaSuspension.useCase';

import { IGetInsertarSuspensionViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import {  GetInsertarSuspensionUseCase } from 'src/domain/suspension/useCases/get-insertarSuspension.useCase';

import { IGetDatosCiudadanoViewModel } from 'src/domain/suspension/viewModels/i-suspension.viewModel';
import {  GetDatosCiudadanoUseCase } from 'src/domain/suspension/useCases/get-datosCiudadano.useCase';


import { GetTribunalContElectoralUseCase } from 'src/domain/tribunalContElectoral/useCases/get-tribunalContElectoral.useCase';

import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { IGetSentenciasTCERegistroViewModel } from 'src/domain/tribunalContElectoral/viewModels/i-sentenciasTCE.viewModel';
import { ARepositoryService } from 'src/domain/archivos_sentencia/services/a-archivos_sentencia-service';

@Component({
  selector: 'app-consulta-suspension',
  templateUrl: './consulta-suspension.component.html',
  styleUrls: ['./consulta-suspension.component.scss']
})

export class ConsultaSuspensionComponent implements OnInit {
  @ViewChild('validationGroupRef', { static: false }) validationGroup!: DxValidationGroupComponent;
  @ViewChild('uploaderRef', { static: false }) uploaderComponent!: DxFileUploaderComponent;
  cedula: string = '';
  
  // Control del modal
  mostrarFormularioManual: boolean = false;
  esIngresoManual: boolean = true;
  datosAutocompletados: boolean = false;
  IsSentenciaDinarp: boolean = false;
  sentenciaArchivoValido: boolean = false;
  // Modelo del formulario
  sentenciaINGRESO = {
    institucion: '' as string | number, // Inicializamos como null, se actualizará en ngOnInit
    cedula: '',
    nombre: '',
    numeroSentencia: '',
    duracion: 0 as  number,
    codigoDuracion:'' as string | number,
    fechaInicio: '' as string | number | Date,
    fechaFin: '' as string | number | Date,
    pdf: '' as string ,
  };

  // Archivo
  sentenciaArchivo: File | null = null;
  
  // Opciones de Instituciones
  instituciones = [
    { id: 1, name: 'Consejo de la Judicatura' },
    { id: 2, name: 'Tribunal Contencioso Electoral' }
  ];

  codDuracion = [
    { id: 1, name: 'Años' },
    { id: 2, name: 'Meses' },
    { id: 3, name: 'Días' }
  ];

  datosDemograficos = {
  nombre: '',
  cedula: '',
  condicion: '',
  nacionalidad: ''
};

  // DataSet
  public dataJudicatura: any[] = [];
  public dataTCE: any[] = [];

  // CJ
  public mostrarTablaCJ: boolean = false;
  public mostrarMensajeCJ: boolean = false;
  public mensajeCJ: string = '';
  esErrorCJ: boolean = false;

  // TCE
  public mostrarTablaTCE: boolean = false;
  public mostrarMensajeTCE: boolean = false;
  public mensajeTCE: string = '';
  esErrorTCE: boolean = false;
  mostrarPdfPopup: boolean = false;
  base64PDF: SafeResourceUrl | null = null;
   maskCedulaRules = { '0': new RegExp('\\d') };
///////////////////////////////////////////////////////////////CONSTRUCTOR///////////////////////////////////////////////////
  constructor(
    //utilitarios
    private alerts: AlertsService,
    public loaderMain: LoaderMainService,
    public loaderDinarp: LoaderService,
    private sanitizer: DomSanitizer,
    //Casos de Uso
    private _getCJudicaturaUseCase: GetCJudicaturaUseCase,
    private _getTContElectoralUseCase: GetTribunalContElectoralUseCase,
     private _getRCivilUseCase: GetRCivilUseCase,
    private _getExistenciaSuspensionUseCase: GetExistenciaSuspensionUseCase,
     private _getInsertarSuspensionUseCase: GetInsertarSuspensionUseCase,
     private _getDatosCiudadanoUseCase: GetDatosCiudadanoUseCase,
    private repositoryService: ARepositoryService,
    
  ) {}

  ngOnInit() {
    // Establecer el valor por defecto al cargar el componente
    this.sentenciaINGRESO.institucion = this.instituciones[0].id; // Precargar "Consejo de la Judicatura"
    this.sentenciaINGRESO.codigoDuracion = this.codDuracion[0].id; // Años
  }

  async buscarInfoSuspension() {
    if (!this.validarCedulaEcuatoriana(this.cedula)) { 
       this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
      return;
    }
  
    this.loaderDinarp.display(true); // Mostrar loadeAr
  
    try {
      await this.getRCInformacion(); 
      await this.getCJSentenciasCedula(); 
      await this.getTCESentenciasCedula(); 
      this.alerts.alertMessage('Búsqueda Exitosa', 'Consultas Realizadas.', 'success');
    } catch (error) {
      console.error('Error al obtener sentencias:', error);
      this.alerts.alertMessage('Error', 'No se pudo obtener la información.', 'error');
    } finally {
      this.loaderDinarp.display(false); // Ocultar loader después de completar (éxito o error)
    }
  }

  ////////////////////////////////////////////////////////////REGISTRO CIVIL////////////////////////////////////////////////////
 public async getRCInformacion(): Promise<void> {
  let body: IGetRegistroCivilViewModel = {
    cedula: this.cedula,
    usuario: '8642',
    proceso: '500',
    ip: '192.188.1.1',
    navegador: 'Chrome',
    servidor: 'N0',
    modulo: '500'
  };

  try {
    const resultRC: any = await this._getRCivilUseCase.getRCivilInfo(body).toPromise();
    console.log('respuesta completa REGISTRO CIVIL', resultRC);

    const data = resultRC?.data;
    if (Array.isArray(data)) {
      const getValor = (campo: string) =>
        data.find((item: any) => item.name === campo)?.value || '';

      this.datosDemograficos = {
        nombre: getValor('nombre'),
        cedula: getValor('cedula'),
        condicion: getValor('condicionCiudadano'),
        nacionalidad: getValor('nacionalidad')
      };
    }

  } catch (error) {
    console.error('Error en getRCSentenciasCedula:', error);
    this.alerts.alertMessage('Error', 'No se pudo obtener la información.', 'error');
    this.mostrarMensajeCJ = true;
    this.mensajeCJ = 'Error al realizar la consulta, por favor intente más tarde.';
    this.mostrarTablaCJ = false;
  }
}


  ////////////////////////////////////////////////////////////CONSEJO DE LA JUDICATURA////////////////////////////////////////////////////
  public async getCJSentenciasCedula(): Promise<void> {
    let body: IGetSentenciasRegistroViewModel = {
      cedula: this.cedula,
      usuario: '8642',
      proceso: '500',
      ip: '192.188.1.1',
      navegador: 'Chrome',
      servidor: 'N0',
      modulo: '500'
    };
  
    try {
      const resultCJ: any = await this._getCJudicaturaUseCase.getCJSentenciasCedula(body).toPromise();
      console.log('respuesta completa CJ', resultCJ);
  
      // Buscar la respuesta de 'tieneSentencias'
      const entidadRespuestaJC = resultCJ.entities?.find((e: any) =>
        e.name === "CJ SENTENCIAS EJECUTORIADAS (RESPUESTA)"
      );
      

      const tieneSentenciasJC = entidadRespuestaJC?.files?.[0]?.columns?.find(
        (col: any) => col.name === 'tieneSentencias'
      )?.value;
  
      // Verificamos el valor de 'tieneSentencias'
      if (tieneSentenciasJC === 'SI') {
        this.mostrarTablaCJ = true;
        this.mostrarMensajeCJ = false;
  
        // Extraemos las sentencias
        const entidadSentenciasJC = resultCJ.entities?.find((e: any) =>
          e.name === "CJ SENTENCIAS EJECUTORIADAS (SENTENCIAS)"
        );
  
        this.dataJudicatura = entidadSentenciasJC?.files?.map((file: any) => {
          const item: any = {};
          file.columns.forEach((col: any) => {
            item[col.name] = col.value;
          });
          return item;
        }) || [];
      } 
      else if (tieneSentenciasJC === 'NO' || tieneSentenciasJC==='No se encontraron datos') {
        this.esErrorCJ = false;
        this.mostrarMensajeCJ = true;
        this.mensajeCJ = 'El ciudadano no posee sentencias registradas en el Consejo de la Judicatura.';
        
        this.mostrarTablaCJ = false;
      } 
      else {
        this.esErrorCJ = true;
        this.mostrarMensajeCJ = true;
        this.mensajeCJ = 'Existen intermitencias en la consulta del Servicio del Consejo de la Judicatura. Por favor intente más tarde.';
        this.mostrarTablaCJ = false;
      }
  
    } catch (error) {
      console.error('Error en getCJSentenciasCedula:', error);
      this.alerts.alertMessage('Error', 'No se pudo obtener la información.', 'error');
      this.mostrarMensajeCJ = true;
      this.mensajeCJ = 'Error al realizar la consulta, por favor intente más tarde.';
      this.mostrarTablaCJ = false;
    }
  }

  ingresarSentenciaCJ(data: any) {
    this.limpiarFormIngreso();
    this.esIngresoManual = false;
    
    this.sentenciaINGRESO = {
      institucion: 1, // Consejo de la Judicatura
      cedula: this.cedula,
      nombre: data.nombreProcesado || '',
      numeroSentencia: data.numeroProceso || '',
      duracion:0,
      codigoDuracion : this.codDuracion[0].id, 
      fechaInicio: data.fechaSentencia ? new Date(data.fechaSentencia) : '',
      fechaFin: new Date(), 
      pdf: '' as string ,
    };
    
    try {
    if (data.documentoBase64) {
      const prefixedBase64 = `data:application/pdf;base64,${data.documentoBase64}`;
      const file = this.base64ToFile(prefixedBase64, `${data.numeroProceso}.pdf`);
      this.sentenciaArchivo = file;
    }
  } catch (e) {
    this.alerts.alertMessage('Error', 'El archivo PDF no es válido o no pudo ser procesado.', 'error');
  }
      this.IsSentenciaDinarp = true;  //Bandera para bloquear los campos cuando se ingresa Dinarp
      this.mostrarFormularioManual = true;

    
  }

  base64ToFile(base64: string, fileName: string): File {
  const matches = base64.match(/^data:(.*);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Base64 inválido');
  }

  const mime = matches[1];
  const bstr = atob(matches[2]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

////////////////////////////////////////////////////////////TRIBUNAL CONTENSIOSO ELECTORAL TCE ////////////////////////////////////////////////////
  public async getTCESentenciasCedula(): Promise<void> {
    let body: IGetSentenciasTCERegistroViewModel = {
      cedula: this.cedula,
      usuario: '8642',
      proceso: '500',
      ip: '192.188.1.1',
      navegador: 'Chrome',
      servidor: 'N0',
      modulo: '500'
    };
  
    try {
      const resultTCE: any = await this._getTContElectoralUseCase.getTCESentenciasCedula(body).toPromise();
      console.log('respuesta completa TCE', resultTCE);
  
      // Buscar la respuesta de 'tieneSentencias'
      const entidadRespuestaTCE = resultTCE.entities?.find((e: any) =>
        e.name === "TCE SENTENCIAS EJECUTORIADAS (RESPUESTA)"
      );
      
      const tieneSentenciasTCE = entidadRespuestaTCE?.files?.[0]?.columns?.find(
        (col: any) => col.name === 'tieneSentencias'
      )?.value;
  
      // Verificamos el valor de 'tieneSentencias'
      if (tieneSentenciasTCE === 'SI') {
        this.mostrarTablaTCE = true;
        this.mostrarMensajeTCE = false;
  
        // Extraemos las sentencias
        const entidadSentenciasTCE = resultTCE.entities?.find((e: any) =>
          e.name === "TCE SENTENCIAS EJECUTORIADAS (SENTENCIAS)"
        );
  
        this.dataTCE = entidadSentenciasTCE?.files?.map((file: any) => {
          const item: any = {};
          file.columns.forEach((col: any) => {
            item[col.name] = col.value;
          });
          return item;
        }) || [];
      } 
      else if (tieneSentenciasTCE === 'NO') {
        this.esErrorTCE = false;
        this.mostrarMensajeTCE = true;
        this.mensajeTCE = 'El ciudadano no posee sentencias registradas en el TCE.';
        
        this.mostrarTablaTCE = false;
      } 
      else {
        this.esErrorTCE = true;
        this.mostrarMensajeTCE = true;
        this.mensajeTCE = 'Existen intermitencias en la consulta del Servicio del Tribunal Contencioso Electoral. Por favor intente más tarde.';
        this.mostrarTablaTCE = false;
      }
  
    } catch (error) {
      console.error('Error en getTCESentenciasCedula:', error);
      this.alerts.alertMessage('Error', 'No se pudo obtener la información.', 'error');
      this.mostrarMensajeTCE = true;
      this.mensajeTCE = 'Error al realizar la consulta, por favor intente más tarde.';
      this.mostrarTablaTCE = false;
    }
  }
  // ===================================================
// 🔵 SECCIÓN: Ingreso Manual y controles Modal Ingreso
// ===================================================
 
buscarInfoIngresoManual() {
  this.limpiarFormIngreso();

  if (!this.validarCedulaEcuatoriana(this.cedula)) {
    this.alerts.alertMessage('Error', 'Ingrese una cédula válida de 10 dígitos.', 'error');
    return;
  }

  const body: IGetDatosCiudadanoViewModel = {
    cedula: this.cedula
  };

  this.loaderMain.display(true);

  this._getDatosCiudadanoUseCase.getDatosCiudadano(body).subscribe({
    next: (response) => {
     console.log('✅ Respuesta Datos Ciudadano:', response );

     if (!Array.isArray(response) || response.length === 0) {
        this.alerts.alertMessage('Atención', 'No se recibió una respuesta válida del servicio.', 'info');
        return;
      }

      const ciudadano = response[0];
    
      if (!ciudadano || ciudadano.info === 'NOT_FOUND') {
        this.alerts.alertMessage('Atención', ciudadano?.mensaje ?? 'No se encontró información del ciudadano.', 'warning');
        return;
      }

      // Asignar datos si se encontró
      this.sentenciaINGRESO.cedula = this.cedula;
      this.sentenciaINGRESO.nombre = ciudadano.nombre ?? '';
      this.datosAutocompletados = true;

      this.esIngresoManual = true;
      this.mostrarFormularioManual = true;
    },
    error: (err) => {
      console.error('❌ Error al consultar datos del ciudadano:', err);
      this.alerts.alertMessage('Error', 'Error al consultar la información del ciudadano.', 'error');
    },
    complete: () => this.loaderMain.display(false)
  });
}

    // Cancelar y cerrar modal
    cancelarFormIngreso() {
      this.mostrarFormularioManual = false;
      this.datosAutocompletados = false;
       this.IsSentenciaDinarp = false;
      
    }
  
      // Limpiar los campos del formulario
  limpiarFormIngreso() {
    this.sentenciaINGRESO.pdf = '';  // Limpiar el archivo PDF cargado
    this.sentenciaArchivo = null; 
    this.sentenciaINGRESO.cedula = '';
    this.sentenciaINGRESO.nombre = '';
    this.sentenciaINGRESO.numeroSentencia = '';
    this.sentenciaINGRESO.fechaInicio = '';
    this.sentenciaINGRESO.fechaFin = '';
    this.sentenciaINGRESO.duracion = 0;
    this.datosAutocompletados = false;
    this.IsSentenciaDinarp = false;

    if (this.uploaderComponent) {
      this.uploaderComponent.instance.reset();
    }
  }

  onArchivoSeleccionado(e: any): void {
  const files = e.value;
  if (!files || files.length === 0) {
    this.sentenciaArchivo = null;
    this.sentenciaArchivoValido = false;
    return;
  }

  const archivo = files[0];
  if (archivo.size > 2 * 1024 * 1024) {
    this.sentenciaArchivo = null;
    this.sentenciaArchivoValido = false;
    if (this.uploaderComponent?.instance) {
      this.uploaderComponent.instance.reset();
    }
    return;
  }

  this.sentenciaArchivo = archivo;
  this.sentenciaArchivoValido = false;
}

// ===================================================
// 🔵 SECCIÓN: Métodos auxiliares o utilitarios
// ===================================================

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

  generarCodigoTransaccion(sentencia: string): string {
  const base64 = btoa(unescape(encodeURIComponent(sentencia))); 
  const clean = base64.replace(/[^A-Z0-9]/gi, '').substring(0, 10); 
  const aleatorio = Math.random().toString(36).substring(2, 8).toUpperCase(); 
  return `${clean}-${aleatorio}`;
}

  formatearFecha(fecha: Date | string): string {
  const d = new Date(fecha);
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

  abrirModalPDF(base64: string) {
    const pdfUrl = 'data:application/pdf;base64,' + base64;
    this.base64PDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.mostrarPdfPopup = true;
  }

validateDuracionMayorACero(e: any): boolean {
  return e.value > 0;
}
  actualizarFechaFin(): void {
    const inicio = new Date(this.sentenciaINGRESO.fechaInicio);
    const duracion = Number(this.sentenciaINGRESO.duracion);
    const tipo = Number(this.sentenciaINGRESO.codigoDuracion);
  
    if (!inicio || !duracion || !tipo) {
      this.sentenciaINGRESO.fechaFin = '';
      return;
    }
  
    const fin = new Date(inicio);
  
    switch (tipo) {
      case 3: // Días
        fin.setDate(fin.getDate() + duracion);
        break;
      case 2: // Meses
        fin.setMonth(fin.getMonth() + duracion);
        break;
      case 1: // Años
        fin.setFullYear(fin.getFullYear() + duracion);
        break;
      default:
        break;
    }
  
    this.sentenciaINGRESO.fechaFin = fin;
  }


// ===================================================
// 🔵 SECCIÓN: Ingreso de Sentencia
// ===================================================

verificarExistenciaSentencia() {
  ///////////////Validación de Campos //////////
  const result = this.validationGroup.instance.validate();
  if (!result.isValid) {
    return; 
  }
  //validacion de archivo
   if (!this.sentenciaArchivo) {
    this.sentenciaArchivoValido=true;
    return;
  }
  /////////////////////////////////////////////
 this.mostrarFormularioManual = false;
  const body: IGetExistenciaSuspensionViewModel = {
    cedula: this.sentenciaINGRESO.cedula,
    numeroSentencia: this.sentenciaINGRESO.numeroSentencia
  };

  this._getExistenciaSuspensionUseCase.getExistenciaSuspension(body).subscribe({
    next: (response) => {

      if (!Array.isArray(response) || response.length === 0) {
        this.alerts.alertMessage('Atención', 'No se recibió una respuesta válida del servicio Existencia Suspensión.', 'info');
        return;
      }

      const resultado = response[0];
      console.log('🔍 Resultado:', resultado);

      switch (resultado?.info) {
        case 'OK':
          this.alerts.alertMessage('Información', resultado.mensaje ?? 'Ya existe una suspensión registrada.', 'warning');
          break;
        case 'NOT_FOUND':
          this.guardarArchivoSentencia();
          break;
        default:
          this.alerts.alertMessage('Atención', 'No se pudo verificar la existencia de la Suspensión. Intente más tarde.', 'info');
          break;
      }
    },
    error: (err) => {
       this.loaderMain.display(false);
      console.error('❌ Error en getExistenciaSuspension:', err);
      this.alerts.alertMessage('Error', 'No se pudo validar la existencia de la sentencia. Intente nuevamente.', 'error');
    }
  });
}


async guardarArchivoSentencia(): Promise<void> {
 if (!this.sentenciaArchivo) {
    
    this.alerts.alertMessage('Error', 'Debe seleccionar un archivo PDF de la Sentencia antes de continuar.', 'error');
    return;
  }

  try {
    const uri = await this.repositoryService.uploadFile(this.sentenciaArchivo, 'SDP/SENTENCIAS').toPromise();

    if (!uri) {
      throw new Error('El servicio no devolvió una URI válida.');
    }

    this.sentenciaINGRESO.pdf = uri;
    console.log('✅ Archivo subido con éxito. URI:', uri);

    this.guardarSentenciaFINAL();

  } catch (error) {
    this.loaderMain.display(false);
    console.error('❌ Error al guardar la sentencia:', error);
    this.alerts.alertMessage('Error', 'Ocurrió un Error, Por favor intente más tarde', 'error');
  }
}

guardarSentenciaFINAL(): void {
  const body: IGetInsertarSuspensionViewModel = {
    cedula: this.sentenciaINGRESO.cedula,
    nombreCiudadano: this.sentenciaINGRESO.nombre,
    codigoEstadoCiudadano: '1', //SUSPENDIDO
    codigoInstitucion: this.sentenciaINGRESO.institucion.toString(),
    numeroSentencia: this.sentenciaINGRESO.numeroSentencia.trim(),
    duracion: this.sentenciaINGRESO.duracion.toString(),
    codigoDuracion: this.sentenciaINGRESO.codigoDuracion.toString(),
     fechaInicioSentencia: this.formatearFecha(this.sentenciaINGRESO.fechaInicio as string | Date),
    fechaFinSentencia: this.formatearFecha(this.sentenciaINGRESO.fechaFin as string | Date),
    fuente: this.esIngresoManual ? 'CNE' : 'DINARP',
    urlDocumentoSentencia: this.sentenciaINGRESO.pdf,
    codigoTransaccion: this.generarCodigoTransaccion(this.sentenciaINGRESO.numeroSentencia), 
    codigoUsuario: sessionStorage.getItem('usercode') || '9999'
  };

  this.loaderMain.display(true);

  this._getInsertarSuspensionUseCase.getInsertarSuspension(body).subscribe({
    next: (resp) => {
      console.log('✅ Sentencia guardada correctamente:', resp);
      this.alerts.alertMessage('Éxito', 'La sentencia fue registrada correctamente.', 'success');
      this.mostrarFormularioManual = false;
      this.limpiarFormIngreso();
    },
    error: (err) => {
      console.error('❌ Error al guardar la sentencia:', err);
      this.alerts.alertMessage('Error', 'No se pudo registrar la sentencia.', 'error');
    },
    complete: () => this.loaderMain.display(false)
  });
}

}