import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailPattern, sweetAlertIcons } from '../../shared/consts'
import { AuthService } from 'src/app/services/auth.service';
import { UiErrorMessagesService } from 'src/app/services/ui-error-messages.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  emailPattern = emailPattern;
  loading = false;
  subscriber!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router,
              private customValidator: UiErrorMessagesService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
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
    return this.customValidator.touchedField(this.registerForm, field)
  }

  iconError(fieldName: string) {
    return this.customValidator.inputValidationStyle(this.registerForm, fieldName);
  }

  createUser(): void {
    if (this.registerForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
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
          title: 'Register Error!',
          icon: sweetAlertIcons.warning,
          showLoading: true,
          timer: 3500
        };
        //options destructuring
        const { msg, title, icon, showLoading, timer } = modalOptions;

        this.customValidator.customModal(msg, title, icon, showLoading, timer);

        //After modal is triggered we clean the form and activate the required field error
        return Object.values( this.registerForm.controls ).forEach( control => {
            control.setValue('');
            this.loading = false;
          });
      })
  }
}
