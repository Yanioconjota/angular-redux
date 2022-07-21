import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { validFilters } from 'src/app/filters/filter.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  currentFilter: validFilters = 'all';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //By subscribing to the state we pass the filter property to our custom pipe to show todos by completion status, we can also destructure the state by replacing it for { todos, filter }, that's your call.
    this.store.subscribe(state => {
      this.todos = state.todos;
      this.currentFilter = state.filter;
    });
  }

}
