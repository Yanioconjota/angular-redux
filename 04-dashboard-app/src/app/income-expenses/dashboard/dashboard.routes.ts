import { Routes } from '@angular/router';
import { StatisticsComponent } from '../statistics/statistics.component';
import { IncomeExpensesComponent } from '../income-expenses.component';
import { DetailComponent } from '../detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-expenses', component: IncomeExpensesComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', redirectTo: '' },
];
