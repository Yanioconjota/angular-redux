import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UiErrorMessagesService } from 'src/app/services/ui-error-messages.service';
import { emailPattern, sweetAlertIcons } from 'src/app/shared/consts';

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

    this.customValidator.loadingModal();

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(credentials => {
        console.log(credentials);
        this.customValidator.closeModal();
        this.router.navigate(['/']);
      })
      .catch(err => {
        //Firebase error destructuring
        const { message } = err;
        //Custom modal options
        const modalOptions = {
          msg: message,
          title: 'Login Error!',
          icon: sweetAlertIcons.error,
          showLoading: true,
          timer: 3500
        };
        //options destructuring
        const { msg, title, icon, showLoading, timer } = modalOptions;

        this.customValidator.customModal(msg, title, icon, showLoading, timer);

        //After modal is triggered we clean the form and activate the required field error
        return Object.values( this.loginForm.controls ).forEach( control => {
          control.setValue('');
        });
      });
  }

}
