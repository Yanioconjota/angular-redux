import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUser = createAction(
  '[USER] Load User',
  props<{ id: string }>()
);
export const loadUserSucess = createAction(
  '[USER] Load User Sucess',
  props<{ user: User }>()
);

export const loadUserError = createAction(
  '[USER] Load User Error',
  props<{ payload: any }>()
);
