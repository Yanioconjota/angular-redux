import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { createTodo } from './todos.actions';

export const initialState: Todo[] = [];

/*
createTodo: receives the props,
if we destructure it we get the text property
we return a new array with whatever is saved in the state
and after that we add a new instance of Todo with
the received text
*/
export const todoReducer = createReducer(
  initialState,
  on(createTodo, (state, { text }) => [...state, new Todo( text )]),
);
