import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeExpenses } from '../models/income-expenses.model';
import { IncomeExpensesService } from '../services/income-expenses.service';
import { UiErrorMessagesService } from '../services/ui-error-messages.service';
import { sweetAlertIcons } from '../shared/consts';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [
  ]
})
export class IncomeExpensesComponent implements OnInit {

  incomeExpensesForm!: FormGroup;
  type = 'income';

  constructor( private fb: FormBuilder,
               private incomeExpensesService: IncomeExpensesService,
               private customMessage: UiErrorMessagesService) { }

  ngOnInit(): void {
    this.incomeExpensesForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]

    });

  }

  save(): void {

    if (this.incomeExpensesForm.invalid) { return; }

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
    });

  }

  toggleType(): void {
    this.type === 'income' ? this.type = 'expenses' : this.type = 'income';
  }

}
