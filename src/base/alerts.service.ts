import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';



@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor() { }
  alertMessage(title: string, message: string = '', icono: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: message,
      icon: icono,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
  }


  alertConfirm(title: string, message: string, fun: Function, cancelFun?: Function) {
    cancelFun = cancelFun || function () { }; // Definir una función vacía si cancelFun no se proporciona
    Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fun();
      } else if (cancelFun) {
        cancelFun();
      }
    })
  }



  alertConfirAndButton(title: string, message: string, fun: Function, funButtonEnabled: Function, funButtonDisabled: Function) {
    funButtonDisabled();
    Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fun();
      } else {
        funButtonEnabled();
      }
    })
  }



  
  alertMessageInput(title: string, message: string, callback: (inputValue: string) => void) {
    Swal.fire({
      title: title,
      text: message,
      html: `
            <label>Ingrese la contraseña de su firma:</label>
            <input type="password" id="swal-input1" value="Auditore995" class="swal2-input" required>
          `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const inputValue = (document.getElementById('swal-input1') as HTMLInputElement).value;

        if (!inputValue) {
          Swal.showValidationMessage('Este campo es requerido');
        }
        return inputValue;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const inputValue = result.value ?? ''; // Usa un valor predeterminado ('') si inputValue es undefined
        callback(inputValue);
      }
    });
  }

  alertMessageInputLarge(title: string, message: string, label:string, callback: (inputValue: string) => void) {
    Swal.fire({
      title: title,
      text: message,
      html: `
            <label>${label}</label>
            <textarea id="swal-input1" class="swal2-textarea" maxLength="250" (keypress)="this._validator.validateOnlyLetter($event)" required></textarea>
          `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const inputValue = (document.getElementById('swal-input1') as HTMLInputElement).value;

        if (!inputValue) {
          Swal.showValidationMessage('Este campo es requerido');
        }
        return inputValue;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const inputValue = result.value ?? ''; 
        callback(inputValue);
      }
    });
  }




}
