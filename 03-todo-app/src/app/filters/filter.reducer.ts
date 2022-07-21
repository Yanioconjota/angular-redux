import { createReducer, on } from '@ngrx/store';
import { setFilter, validFilters } from './filter.actions';

export const initialState: validFilters = 'all';
/*
createReducer<validFilters> by assigning the type of validFilters we avoid the following error on returning the filters... => filters...
Type 'validFilters' is not assignable to type '"all"'.
  Type '"completed"' is not assignable to type '"all"'.ts(2322)
*/
export const filterReducer = createReducer<validFilters>(
  initialState,
  on(setFilter, (state, { filter } ) => filter ),
)
