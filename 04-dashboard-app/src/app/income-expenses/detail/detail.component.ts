import { Subscription } from 'rxjs';
import { IncomeExpenses } from './../../models/income-expenses.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  incomeExpenses: IncomeExpenses[] = [];
  subsriber!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subsriber = this.store.select('incomeExpenses')
      .subscribe(({items}) => {
        console.log(items);
        this.incomeExpenses = items;
      });
  }

  ngOnDestroy(): void {
    this.subsriber.unsubscribe();
  }

  delete(uid: string | undefined):void {
    console.log(uid);
  }

}
