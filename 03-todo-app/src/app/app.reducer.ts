import { Todo } from "./todos/models/todo.model";

/*
It could be called app.state too...
It show us the how the global state is right now...
*/

export interface AppState {
  todos: Todo[]
}
