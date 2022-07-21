import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { createTodo, toggleTodo, editTodo, deleteTodo, toggleAll, clearCompleted } from './todos.actions';

export const initialState: Todo[] = [
  new Todo('Eat some pizza'),
  new Todo('Get some Campari tonic'),
  new Todo('Code something'),
  new Todo('Go to the gym... Ha...'),
];

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
  on(toggleTodo, (state, { id }) => {
    //Return a new array with the id matching item completed status is toggled
    return state.map(todo => {
      /*
      when the received id matches the todo id, we create a new reference where the todo matching the condition toggles the completed status, when the condition is not matched we jus simply return an unaltered todo
      */

      return todo.id === id ? { ...todo, completed: !todo.completed } : todo
    });
  }),
  on(editTodo, (state, { id, text }) => {
    return state.map(todo => {
      /*
      Works pretty much the same as toggleTodo but instead of changing the completed status we pass a new text property with the text received as argument
      */
      return todo.id === id ? { ...todo, text: text } : todo
    });
  }),
  on(deleteTodo, (state, {id}) => {
    /*
    Returns a new array with all todos but the one matching the id received
    */
    return state.filter( todo => todo.id !== id )
  }),
  on(toggleAll, (state, { completed }) => {
    return state.map(todo => {
      /*
      Returns a new array with all todos complete status marked as the complete status received
      */

      return { ...todo, completed: completed }
    });
  }),
  on(clearCompleted, (state) => {
    //Return a new array without the completed todos
    return state.filter( todo => !todo.completed );
  }),
);
