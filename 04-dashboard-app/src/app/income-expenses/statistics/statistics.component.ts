import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpenses } from '../../models/income-expenses.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

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
  // Doughnut
  public doughnutChartLabels: string[] = [ 'Income', 'Expenses' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{
      data: [],
      backgroundColor: [
        'rgb(89, 131, 232)',
        'rgb(0, 228, 208)',
      ],
       hoverBackgroundColor: '#222',
       hoverBorderColor: '#222',
    }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.subscriber = this.store.select('incomeExpenses').subscribe(({items}) => this.generateStatistics(items));
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  generateStatistics(items: IncomeExpenses[]) {
    console.log(items);
    //Reset value to avoid misscalculation on generateStatistics call --> When manually editing values on firebase these values where incremented everytime since generateStatistics is called by subscription on every store change
    this.income = 0;
    this.expenses = 0;
    this.totalIncome = 0;
    this.totalExpenses = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income ++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses ++;
      }
    }
    this.doughnutChartData.datasets[0].data = [this.totalIncome, this.totalExpenses];
  }

}
