import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { UiMessagesService } from 'src/app/services/ui-messages.service';
import { emailPattern, sweetAlertIcons } from 'src/app/shared/consts';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  emailPattern = emailPattern;
  loading = false;
  subscriber!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router,
              private customMessage: UiMessagesService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '',  [Validators.required, Validators.pattern(this.emailPattern)] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });

    this.subscriber = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('loading...')
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  showError(field: string) {
    return this.customMessage.touchedField(this.loginForm, field)
  }

  iconError(fieldName: string) {
    return this.customMessage.inputValidationStyle(this.loginForm, fieldName);
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(credentials => {
        console.log(credentials);
        this.store.dispatch(ui.stopLoading());
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

        this.customMessage.customModal(msg, title, icon, showLoading, timer);

        //After modal is triggered we clean the form and activate the required field error
        return Object.values( this.loginForm.controls ).forEach( control => {
          control.setValue('');
          this.loading = false;
        });

      });
  }

}
