import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { DxFileUploaderComponent } from 'devextreme-angular';

import { IGetSentenciasRegistroViewModel } from 'src/domain/consJudicatura/viewModels/i-sentencias.viewModel';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';
import { GetTribunalContElectoralUseCase } from 'src/domain/tribunalContElectoral/useCases/get-tribunalContElectoral.useCase';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { IGetSentenciasTCERegistroViewModel } from 'src/domain/tribunalContElectoral/viewModels/i-sentenciasTCE.viewModel';

@Component({
  selector: 'app-consulta-suspension',
  templateUrl: './consulta-suspension.component.html',
  styleUrls: ['./consulta-suspension.component.scss']
})

export class ConsultaSuspensionComponent implements OnInit {
  @ViewChild('uploaderRef', { static: false }) uploaderComponent!: DxFileUploaderComponent;
  cedula: string = '';
  
  // Control del modal
  mostrarFormularioManual: boolean = false;
  esIngresoManual: boolean = true;
  // Modelo del formulario
  sentenciaManual = {
    institucion: '' as string | number, // Inicializamos como null, se actualizará en ngOnInit
    cedula: '',
    nombre: '',
    numeroSentencia: '',
    duracion: 0 as  number,
    codigoDuracion:'' as string | number,
    fechaInicio: '' as string | number | Date,
    fechaFin: '' as string | number | Date,
    pdf: null
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
///////////////////////////////////////////////////////////////CONSTRUCTOR///////////////////////////////////////////////////
  constructor(
    private alerts: AlertsService,
    public loader: LoaderService,
    private sanitizer: DomSanitizer,
    private _getCJudicaturaUseCase: GetCJudicaturaUseCase,
    private _getTContElectoralUseCase: GetTribunalContElectoralUseCase
  ) {}

  ngOnInit() {
    // Establecer el valor por defecto al cargar el componente
    this.sentenciaManual.institucion = this.instituciones[0].id; // Precargar "Consejo de la Judicatura"
    this.sentenciaManual.codigoDuracion = this.codDuracion[0].id; // Años
  }

  async buscarInfoSuspension() {
    if (!this.validarCedulaEcuatoriana(this.cedula)) { 
      this.alerts.alertMessage('Error', 'Favor ingresar una cédula válida.', 'error');
      return;
    }
  
    this.loader.display(true); // Mostrar loadeAr
  
    try {
      await this.getCJSentenciasCedula(); // Esperar hasta que termine la llamada al API
      console.log('databyteJudicatura',this.dataJudicatura);
      await this.getTCESentenciasCedula(); // Esperar hasta que termine la llamada al API
      this.alerts.alertMessage('Búsqueda Exitosa', 'Consultas Realizadas.', 'success');
    } catch (error) {
      console.error('Error al obtener sentencias:', error);
      this.alerts.alertMessage('Error', 'No se pudo obtener la información.', 'error');
    } finally {
      this.loader.display(false); // Ocultar loader después de completar (éxito o error)
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
    this.sentenciaManual = {
      institucion: 1, // Consejo de la Judicatura
      cedula: this.cedula,
      nombre: data.nombreProcesado || '',
      numeroSentencia: data.numeroProceso || '',
      duracion:0,
      codigoDuracion : this.codDuracion[0].id, // Años
      fechaInicio: data.fechaSentencia ? new Date(data.fechaSentencia) : '',
      fechaFin: new Date(), 
      pdf: null
    };
  
    this.mostrarFormularioManual = true;
  
    
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
  ////////////////////////////////////////////////////////////////INGRESO MANUAL /////////////////////////////////////////////////////
 
  async buscarInfoIngresoManual() {
    this.limpiarFormIngreso();
    this.esIngresoManual = true;
    this.mostrarFormularioManual = true;
  }

    // Cancelar y cerrar modal
    cancelarFormIngreso() {
      this.mostrarFormularioManual = false;
    }
  
      // Limpiar los campos del formulario
  limpiarFormIngreso() {
    this.sentenciaManual.pdf = null;  // Limpiar el archivo PDF cargado
    this.sentenciaArchivo = null; 
    this.sentenciaManual.cedula = '';
    this.sentenciaManual.nombre = '';
    this.sentenciaManual.numeroSentencia = '';
    this.sentenciaManual.fechaInicio = '';
    this.sentenciaManual.fechaFin = '';
    this.sentenciaManual.duracion = 0;
    if (this.uploaderComponent) {
      this.uploaderComponent.instance.reset();
    }
  }

   // Guardar los datos ingresados
   guardarManual() {
    if (!this.sentenciaManual.cedula || !this.sentenciaManual.numeroSentencia) {
      alert('Por favor, complete al menos la cédula y el número de sentencia.');
      return;
    }

    // Simulación de guardado (puedes reemplazar por una llamada a un servicio real)
    console.log('Sentencia ingresada manualmente:', this.sentenciaManual);

    // Aquí podrías llamar un servicio HTTP si deseas enviar estos datos al backend
    // this.miServicio.guardarSentencia(this.sentenciaManual).subscribe(...)

    alert('Sentencia guardada correctamente');
    this.mostrarFormularioManual = false;
    this.limpiarFormIngreso();
  }

  onArchivoSeleccionado(e: any): void {
    const files = e.value;
    if (files && files.length > 0) {
      this.sentenciaArchivo = files[0]; // Solo un archivo PDF
      console.log('Archivo seleccionado:', this.sentenciaArchivo);
    }
  }
  ////////////////////////////////////////////////////////////////METODOS VALIDACION/////////////////////////////////////////////////////

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

  abrirModalPDF(base64: string) {
    const pdfUrl = 'data:application/pdf;base64,' + base64;
    this.base64PDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.mostrarPdfPopup = true;
  }

  actualizarFechaFin(): void {
    const inicio = new Date(this.sentenciaManual.fechaInicio);
    const duracion = Number(this.sentenciaManual.duracion);
    const tipo = Number(this.sentenciaManual.codigoDuracion);
  
    if (!inicio || !duracion || !tipo) {
      this.sentenciaManual.fechaFin = '';
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
  
    this.sentenciaManual.fechaFin = fin;
  }
  ingresarSentenciaFinal() {

    this.mostrarFormularioManual = false;
    this.alerts.alertConfirm(
      '¿Está seguro?',
      'Esta acción ingresará la Suspensión de Derechos Políticos.',
      () => {
        this.alerts.alertMessage('Exito', 'Suspensión Ingresada Correctamente.', 'success');
      },
      () => {
        this.mostrarFormularioManual = false;
      }
    );
  }

}