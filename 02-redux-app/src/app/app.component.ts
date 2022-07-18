import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

interface AppState {
  counter: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter: number;

  constructor(private store: Store<AppState>) {
    this.counter = 10;
    this.store.subscribe( state => {
      console.log(state);
      this.counter = state.counter;
    })
  }

  increase():void {
    this.counter += 1;
  }

  decrease():void {
    this.counter -= 1;
  }
}
