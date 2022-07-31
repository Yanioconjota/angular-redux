import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
              private router: Router) { }

  get validName() { return this.registerForm.get('name')?.valid; }
  get validEmail() { return this.registerForm.get('email')?.valid; }
  get validPassword() { return this.registerForm.get('password')?.valid; }

  get touchedName() { return this.registerForm.get('name')?.touched || this.registerForm.get('name')?.dirty; }
  get touchedEmail() { return this.registerForm.get('email')?.touched || this.registerForm.get('email')?.dirty; }
  get touchedPassword() { return this.registerForm.get('password')?.touched || this.registerForm.get('password')?.dirty; }

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
        return this.validName ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      case 'email':
        return this.validEmail ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      case 'password':
        return this.validPassword ? 'text-success fa-check-circle' : 'text-danger fa-times-circle'
      default:
        return ''
    }
  }

}
