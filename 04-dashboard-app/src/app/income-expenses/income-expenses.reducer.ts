import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IncomeExpenses } from '../models/income-expenses.model';
import { setItems, unsetItems } from './income-expenses.actions';

//state interface
export interface State {
    items: IncomeExpenses[];
}

export interface AppStateIncomeExpenses extends AppState {
  incomeExpenses: State
}

//state initialization
export const initialState: State = {
   items: [],
}

export const incomeExpensesReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items]})),

     on(unsetItems, state => ({ ...state, items: [] })),

);
