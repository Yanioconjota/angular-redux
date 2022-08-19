import { createAction, props } from '@ngrx/store';
import { IncomeExpenses } from '../models/income-expenses.model';

export const setItems = createAction(
  '[INCOME-EXPENSES] Set Items',
  props<{ items: IncomeExpenses[] }>()
);

export const unsetItems = createAction('[INCOME-EXPENSES] Unset Items');
