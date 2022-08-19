import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IncomeExpenses } from '../models/income-expenses.model';
import { IncomeExpensesService } from '../services/income-expenses.service';
import { UiErrorMessagesService } from '../services/ui-error-messages.service';
import { sweetAlertIcons } from '../shared/consts';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [
  ]
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {

  incomeExpensesForm!: FormGroup;
  type = 'income';
  loading = false;
  subscriber!: Subscription;

  constructor( private fb: FormBuilder,
               private incomeExpensesService: IncomeExpensesService,
               private store: Store<AppState>,
               private customMessage: UiErrorMessagesService ) { }

  ngOnInit(): void {
    this.incomeExpensesForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.subscriber = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('loading...');
    });

  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  save(): void {

    //Prevents submit when invalid
    if (this.incomeExpensesForm.invalid) { return; }

    //adds a spinner effect to the button
    this.store.dispatch(ui.isLoading());

    const { description, amount } = this.incomeExpensesForm.value;

    //we save the form data in a new instance of IncomeExpenses model
    const incomeExpenses = new IncomeExpenses(description, amount, this.type);

    console.log(incomeExpenses);

    //we call createIncomeExpenses method and pass our IncomeExpenses instance as a parameter and after the promise is resolved we trigger a custom message modal and reset the form
    this.incomeExpensesService.createIncomeExpenses(incomeExpenses).then(() => {

      this.incomeExpensesForm.reset();

      const modalOptions = {
          msg: `Added successfully as ${ this.type }`,
          title: `${ description }`,
          icon: sweetAlertIcons.success,
          showLoading: true,
          timer: 3500
        };
        //options destructuring
        const { msg, title, icon, showLoading, timer } = modalOptions;

        this.customMessage.customModal(msg, title, icon, showLoading, timer);

        this.store.dispatch(ui.stopLoading());
        this.type = 'income';
    }).catch( err => {
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

        const { msg, title, icon, showLoading, timer } = modalOptions;

        this.customMessage.customModal(msg, title, icon, showLoading, timer);
        this.store.dispatch(ui.stopLoading());
        this.type = 'income';
        this.loading = false;
    });

  }

  toggleType(): void {
    this.type === 'income' ? this.type = 'expenses' : this.type = 'income';
  }

}
