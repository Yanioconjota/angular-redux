import { ActionReducerMap } from "@ngrx/store";
import { validFilters } from "./filters/filter.actions";
import { filterReducer } from "./filters/filter.reducer";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/todo.reducer";

/*
It could be called app.state too...
It show us the how the global state is right now...
*/

export interface AppState {
  todos: Todo[],
  filter: validFilters
}

/*
By creating an app reducer we manage to clean imports in our app module and manage all reducer imports in this file
*/

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer
}
