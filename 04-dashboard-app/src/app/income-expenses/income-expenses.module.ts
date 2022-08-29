import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from '../app-routing.module';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { StatisticsComponent } from './statistics/statistics.component';

//Custom Modules
import { SharedModule } from '../shared/shared.module';

//Custom Pipe
import { SortIncomeExpensesPipe } from '../pipes/sort-income-expenses.pipe';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpensesReducer } from './income-expenses.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    SortIncomeExpensesPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('incomeExpenses', incomeExpensesReducer),
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgChartsModule
  ],
  exports: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    SortIncomeExpensesPipe
  ]
})
export class IncomeExpensesModule { }
