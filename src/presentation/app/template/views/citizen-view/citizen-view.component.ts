import { Component } from '@angular/core';
import { ICiudadanoViewModel } from 'src/domain/models/ciudadano.viewModel';
import { CitizenUseCase } from 'src/domain/usecases/citizen.usecase';
import { DeleteCitizenUseCase } from 'src/domain/usecases/deleteCitizen.usecase';
import { SaveCitizenUseCase } from 'src/domain/usecases/saveCitizen.usecase';
import { UpdateCitizenUseCase } from 'src/domain/usecases/updateCitizen.usecase';
import PubSub from 'pubsub-js';

@Component({
  selector: 'cne-citizen-view',
  templateUrl: './citizen-view.component.html',
  styleUrls: ['./citizen-view.component.scss']
})
export class CitizenViewComponent {
  citizenList: ICiudadanoViewModel[] = [];
  columns: any [] = [{name:'Cédula', field:'cedula'}, {name:'Nombre', field:'nombreCompleto'}, {name:'Provincia', field:'provincia', isEditing:false} , {name:'Cantón', field:'canton', isEditing:false}, {name:'Parroquia', field:'parroquia', isEditing:false }, {name:'Zona', field:'zona', isEditing:false }];

  isLoading: boolean = false;

  constructor(private citizenUseCase: CitizenUseCase,
    private saveCitizenUseCase: SaveCitizenUseCase,
    private updateCitizenUseCase: UpdateCitizenUseCase,
    private deleteCitizenUseCase: DeleteCitizenUseCase
    ) {
    this.getListCitizens();
  }

  changeProcess($event:any){
    console.log($event);
  }
  
   onSaving($event:any){
    let identification = '';
    let fullName = ''

    switch ($event.changes[0].type) {
      case 'insert':
        identification = $event.changes[0].data.cedula;
        fullName = $event.changes[0].data.nombreCompleto;
        this.addCitizen(identification, fullName);
        break;
      case 'update':
        identification = $event.changes[0].key.cedula;
        fullName = $event.changes[0].data.nombreCompleto;
        this.updateCitizen(identification, fullName);
        break;
      case 'remove':
        identification = $event.changes[0].key.cedula;
        this.deleteCitizen(identification);
        break;
      default:
        console.log('Error en el form');
        break;
    }
  }

  getListCitizens() {
    this.citizenList = [];
    this.isLoading = true;
    this.citizenUseCase.execute({auditoria:this.getParams()}).subscribe({
      next: (res) => {
        this.citizenList.push(res);
        this.isLoading = false;
      },
      error: (e) => {
        PubSub.publish('error', e.error.title);
        this.getListCitizens();
        this.isLoading = false;
      }
    });
  }

  getParams(): any{
    return  {
      usuario: 1,
      proceso: 500,
      ip: "192.168.1.1",
      navegador: "Chrome",
      tipoRequest: "C",
      descripcionRequest: "Consulta Ciudadanos",
      servidor: "no"
    }
  }

  addCitizen(identification: string, fullName: string) {
    this.isLoading = true;
    this.saveCitizenUseCase.execute({auditoria:this.getParams(), cedulaIdentidad: identification, apellidosNombres: fullName}).subscribe({
      next: (res) => {
        this.getListCitizens();
        this.isLoading = false;
        PubSub.publish('success', 'Ciudadano Agregado.');
      },
      error: (e) => {
        PubSub.publish('error', e.error.title);
        this.getListCitizens();
        this.isLoading = false;
      }
    });
  }

  updateCitizen(identification: string, fullName: string) {
    this.isLoading = true;
    this.updateCitizenUseCase.execute({auditoria:this.getParams(), cedulaIdentidad: identification, apellidosNombres: fullName}).subscribe({
      next: (res) => {
        this.getListCitizens();
        this.isLoading = false;
        PubSub.publish('success', 'Ciudadano Actualizado.');
      },
      error: (e) => {
        PubSub.publish('error', e.error.title);
        this.getListCitizens();
        this.isLoading = false;
      }
    });
  }

  deleteCitizen(identification: string) {
    this.isLoading = true;
    this.deleteCitizenUseCase.execute({auditoria:this.getParams(), cedulaIdentidad: identification}).subscribe({
      next: (res) => {
        this.getListCitizens();
        this.isLoading = false;
        PubSub.publish('success', 'Ciudadano Borrado.');
      },
      error: (e) => {
        PubSub.publish('error', e.error.title);
        this.getListCitizens();
        this.isLoading = false;
      }
    });
  }
}
