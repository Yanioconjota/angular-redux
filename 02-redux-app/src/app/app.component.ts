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
    //The select method allow us to subscribe to one state property only rather than the whole state this.store.subscribe(state)=>... and the subscribes is triggered only when that property changes
    this.store.select('counter').subscribe(counter => this.counter = counter);
  }

  increase():void {
    this.counter += 1;
  }

  decrease():void {
    this.counter -= 1;
  }
}
