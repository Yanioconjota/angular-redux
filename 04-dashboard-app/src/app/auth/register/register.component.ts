import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailPattern } from '../../shared/consts'
import { AuthService } from 'src/app/services/auth.service';
import { UiErrorMessagesService } from 'src/app/services/ui-error-styles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  emailPattern = emailPattern;
  errorMessage! : string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private customValidator: UiErrorMessagesService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '',  [Validators.required, Validators.pattern(this.emailPattern)] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  showError(field: string) {
    return this.customValidator.touchedField(this.registerForm, field)
  }

  iconError(fieldName: string) {
    return this.customValidator.inputValidationStyle(this.registerForm, fieldName);
  }

  createUser(): void {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
          return Object.values( this.registerForm.controls ).forEach( control => {
            control.setValue('')
          });
        }, 2500);
      })
  }
}
