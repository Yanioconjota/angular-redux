import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../counter.actions';

//This interface has the same type declared module in which the stored was imported -->  StoreModule.forRoot({ counter: counterReducer })
interface AppState {
  counter: number;
}

@Component({
  selector: 'app-ngrx-example',
  templateUrl: './ngrx-example.component.html',
  styles: [
  ]
})
export class NgrxExampleComponent implements OnInit {

  counter: number | undefined;

  constructor(private store: Store<AppState>) {
    //The select method allow us to subscribe to one state property only rather than the whole state this.store.subscribe(state)=>... and the subscribes is triggered only when that property changes
    this.store.select('counter').subscribe(counter => this.counter = counter);
  }

  ngOnInit(): void {
  }

  increment(): void {
    this.store.dispatch(actions.increment())
  }

  decrement(): void {
    this.store.dispatch(actions.decrement())
  }

  reset(): void {
    this.store.dispatch(actions.reset())
  }

}
