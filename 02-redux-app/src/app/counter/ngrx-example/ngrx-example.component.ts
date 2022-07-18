import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../counter.actions';

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

  multiply():void {
    this.store.dispatch(actions.multiply({number: 2}))
  }

  divide():void {
    this.store.dispatch(actions.divide({number: 2}))
  }

  reset(): void {
    this.store.dispatch(actions.reset())
  }

}
