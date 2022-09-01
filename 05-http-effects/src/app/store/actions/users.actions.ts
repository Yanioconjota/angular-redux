import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[USERS] Load Users');
export const loadUsersSucess = createAction(
  '[USERS] Load Users Sucess',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[USERS] Load Users Error',
  props<{ payload: any }>()
);
