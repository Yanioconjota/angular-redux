import { IncomeExpenses } from './../models/income-expenses.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortIncomeExpenses'
})
export class SortIncomeExpensesPipe implements PipeTransform {



  transform(items: IncomeExpenses[], ...args: any): IncomeExpenses[] | undefined {
    switch (args[1]) {

      case 'amount':

        if (args[0] === true) {
          return items.slice().sort((a,b) => a.amount < b.amount ? 1 : -1);
        } else {
          return items.slice().sort((a,b) => a.amount > b.amount ? 1 : -1);
        };

      case 'description':

        if (args[0] === true) {
          return items.slice().sort((a,b) => a.description < b.description ? 1 : -1);
        } else {
          return items.slice().sort((a,b) => a.description > b.description ? 1 : -1);
        };

      default:
        if (args[0] === true) {
          return items.slice().sort((a,b) => a.type < b.type ? 1 : -1);
        } else {
          return items.slice().sort((a,b) => a.type > b.type ? 1 : -1);
        };
    }
    //slice is added to avoid ERROR TypeError: 0 is read-only


  }

}
