import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { toggleTodo } from '../todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('editingInput') editingInput!: ElementRef;
  editing = false;
  chkCompleted!: FormControl;
  txtInput!: FormControl;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompleted.valueChanges.subscribe( value => {
     this.store.dispatch(toggleTodo({ id: this.todo.id }));
    });
  }

  edit(): void {
    this.editing = true;
    setTimeout(() => {
      this.editingInput.nativeElement.select();
    }, 1);
  }

  endEditing() {
    this.editing = false;
  }

}
