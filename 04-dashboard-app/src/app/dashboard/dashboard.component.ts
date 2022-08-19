import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { IncomeExpensesService } from '../services/income-expenses.service';
import { User } from '../models/user.model';
import * as incomeExpensesActions from '../income-expenses/income-expenses.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriber!: Subscription

  constructor(private store: Store<AppState>,
              private incomeExpensesService: IncomeExpensesService) { }

  ngOnInit(): void {
    this.subscriber = this.store.select('auth')
      .pipe(
        //we use the pipe operator because the user first appears as null and then we get the data
        filter(auth => auth.user !== null)
      )
      .subscribe(({user}) => {
        this.incomeExpensesService.initIncomeExpensesListener(user?.uid)
          .subscribe( incomeExpensesFB => {
            console.log(incomeExpensesFB);
            this.store.dispatch(incomeExpensesActions.setItems({ items: incomeExpensesFB }))
          })
      });
  }

  ngOnDestroy(): void {
    //unsubscribe on logout
    this.subscriber.unsubscribe();
  }

}
