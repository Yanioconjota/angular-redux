import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { deleteTodo, editTodo, toggleTodo } from '../todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  //The todo input is passed from the parent component which call the todos array from the store
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
    //Prevents the input to go blank when entering in input mode
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.editingInput.nativeElement.select();
    }, 1);
  }

  endEditing(): void {
    this.editing = false;

    //Prevents to add empty string as a value
    if (this.txtInput.invalid) return;
    //Prevents to trigger the action when the value doesn't chang
    if (this.txtInput.value === this.todo.text) return;

    this.store.dispatch(editTodo(
      {
        id: this.todo.id,
        text: this.txtInput.value
      }
    ));
  }

  delete(): void {
    this.store.dispatch(deleteTodo({ id: this.todo.id }));
  }

}
