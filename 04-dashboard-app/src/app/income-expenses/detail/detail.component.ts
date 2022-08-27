import { Subscription } from 'rxjs';
import { IncomeExpenses } from './../../models/income-expenses.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpensesService } from '../../services/income-expenses.service';
import { UiMessagesService } from 'src/app/services/ui-messages.service';
import { sweetAlertIcons } from 'src/app/shared/consts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  incomeExpenses: IncomeExpenses[] = [];
  subsriber!: Subscription;

  typeSort = false;

  constructor(private store: Store<AppState>,
              private incomeExpensesService: IncomeExpensesService,
              private customMessage: UiMessagesService) { }

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

  delete(item: IncomeExpenses):void {
    const { description, type, uid } = item;
    this.incomeExpensesService.deleteIncomeExpenses(uid)
        .then(() => {
          const modalOptions = {
          msg: `Successfully deleted from ${ type }`,
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
            title: 'Delete Error!',
            icon: sweetAlertIcons.error,
            showLoading: true,
            timer: 3500
          };

          const { msg, title, icon, showLoading, timer } = modalOptions;

          this.customMessage.customModal(msg, title, icon, showLoading, timer);
        })
  }

}
