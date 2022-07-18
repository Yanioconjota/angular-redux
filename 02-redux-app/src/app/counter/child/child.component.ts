import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  @Input() counter!: number;
  @Output() updateCounter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  multiply(): void {
    this.counter *= 2;
    this.updateCounter.emit(this.counter);
  }

  divide(): void {
    this.counter /= 2;
    this.updateCounter.emit(this.counter);
  }

  resetFromGrandchild(newValue: number): void {
    this.counter = newValue;
    this.updateCounter.emit(this.counter);
  }

}
