import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpenses } from '../../models/income-expenses.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit, OnDestroy {

  income = 0;
  expenses = 0;
  totalIncome = 0;
  totalExpenses = 0;
  subscriber!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.subscriber = this.store.select('incomeExpenses').subscribe(({items}) => this.generateStatistics(items));
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  generateStatistics(items: IncomeExpenses[]) {
    console.log(items);

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income ++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses ++;
      }

    }
  }

}
