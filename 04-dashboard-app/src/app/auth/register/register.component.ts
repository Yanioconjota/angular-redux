import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private customValidator: ValidatorService) { }

  showError(field: string) {
    return this.customValidator.touchedField(this.registerForm, field)
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '',  [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
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
        console.log(err);
      })
  }

  inputValidationStyle(fieldName: string): string {
    fieldName.trim().toLowerCase();
    switch (fieldName) {
      case 'name':
        return this.customValidator.validField(this.registerForm, 'name') ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      case 'email':
        return this.customValidator.validField(this.registerForm, 'email') ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      case 'password':
        return this.customValidator.validField(this.registerForm, 'password') ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      default:
        return ''
    }
  }

}
