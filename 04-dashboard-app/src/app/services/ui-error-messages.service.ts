import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UiErrorMessagesService {

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

  errorModal(err: any) {
    const { message } = err;
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }

}
