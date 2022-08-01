import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validField(form: FormGroup, field: string) {
    return form.get(field)?.valid;
  }

  touchedField(form: FormGroup, field: string) {
    return form.get(field)?.touched || form.get(field)?.dirty;
  }

}
