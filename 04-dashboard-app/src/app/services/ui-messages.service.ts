import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UiMessagesService {

  constructor() { }

  validField(form: FormGroup, field: string) {
    return form.get(field)?.valid;
  }

  touchedField(form: FormGroup, field: string) {
    return form.get(field)?.touched || form.get(field)?.dirty;
  }

  inputValidationStyle(form: FormGroup,fieldName: string): string {
    fieldName = fieldName.trim().toLowerCase();
    return this.validField(form, fieldName) ? 'text-success fa-check-circle' : 'text-danger fa-times-circle';
  }

  customModal(message: any, title?: string, icon?: SweetAlertIcon | undefined , showLoading?: boolean, timer?: number) {
    Swal.fire({
      title: title || 'Please wait',
      text: message,
      icon: icon,
      timer: timer,
      timerProgressBar: showLoading,
      confirmButtonText: 'Cool',
      didOpen: () => {
        if ( showLoading ) Swal.showLoading();
      },
    });
  }

  loadingModal() {
    Swal.fire({
      title: 'Please wait',
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }

  closeModal() {
    Swal.close();
  }

}
