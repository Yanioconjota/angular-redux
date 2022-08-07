import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as auth from './auth.actions';

export interface State {
    user: User | null;
}

export const initialState: State = {
   user: null,
}

export const authReducer = createReducer(initialState,
    //we passed a new destructured user to break all attachments with the original user
    on(auth.setUser, (state, { user }) => ({ ...state, user: { ...user }})),

    on(auth.unSetUser, state => ({ ...state, user: null })),

);
