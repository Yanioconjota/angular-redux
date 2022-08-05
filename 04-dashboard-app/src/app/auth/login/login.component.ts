import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UiErrorMessagesService } from 'src/app/services/ui-error-messages.service';
import { emailPattern } from 'src/app/shared/consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailPattern = emailPattern;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private customValidator: UiErrorMessagesService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '',  [Validators.required, Validators.pattern(this.emailPattern)] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  showError(field: string) {
    return this.customValidator.touchedField(this.loginForm, field)
  }

  iconError(fieldName: string) {
    return this.customValidator.inputValidationStyle(this.loginForm, fieldName);
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.customValidator.errorModal(err, true, 5000);
        return Object.values( this.loginForm.controls ).forEach( control => {
          control.setValue('');
        });
      });
  }

}
