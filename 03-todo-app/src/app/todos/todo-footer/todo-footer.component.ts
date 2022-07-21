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

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('filter')
      .subscribe( filter => {
        this.currentFilter = filter;
      })
  }

  changeFilter(filter: validFilters): void {
    this.store.dispatch(setFilter({ filter: filter }));
  }

}
