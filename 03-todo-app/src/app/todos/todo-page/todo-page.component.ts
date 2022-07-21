import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { toggleAll } from '../todos.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  completed = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleAll(): void {
    this.completed = !this.completed;
    console.log(this.completed);

    this.store.dispatch(toggleAll({ completed: this.completed }))
  }

}
