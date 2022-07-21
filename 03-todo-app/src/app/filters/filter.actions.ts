import { createAction, props } from '@ngrx/store';

export type validFilters = 'all' | 'completed' | 'pending';

export const setFilter = createAction(
  '[FILTER] Set filter',
  props<{ filter: validFilters }>()
);
