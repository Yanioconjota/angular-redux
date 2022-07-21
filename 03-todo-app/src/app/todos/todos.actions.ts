import { createAction, props } from '@ngrx/store';

export const createTodo = createAction(
  '[TODO] Create todo',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[TODO] Toggle todo',
  props<{ id: number }>()
);

export const editTodo = createAction(
  '[TODO] Edit todo',
  props<{ id: number, text: string }>()
);
