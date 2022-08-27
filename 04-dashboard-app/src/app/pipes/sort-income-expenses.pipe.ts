import { IncomeExpenses } from './../models/income-expenses.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortIncomeExpenses'
})
export class SortIncomeExpensesPipe implements PipeTransform {

  transform(items: IncomeExpenses[], ...args: unknown[]): IncomeExpenses[] {
    console.log(args[0]);
    //slice is added to avoid ERROR TypeError: 0 is read-only
    if (args[0] === true) {
      return items.slice().sort((a,b) => a.type < b.type ? 1 : -1);
    } else {
      return items.slice().sort((a,b) => a.type > b.type ? 1 : -1);
    }
  }

}
