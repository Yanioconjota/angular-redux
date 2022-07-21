import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setFilter, validFilters } from 'src/app/filters/filter.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  currentFilter: validFilters = 'all';
  filters: validFilters[] = ['all', 'completed', 'pending'];
  pending = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    /* this.store.select('filter').subscribe( filter => {
      this.currentFilter = filter;
    }); */

    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.pending = state.todos.filter( todo => !todo.completed).length
    })
  }

  changeFilter(filter: validFilters): void {
    this.store.dispatch(setFilter({ filter: filter }));
  }

}
