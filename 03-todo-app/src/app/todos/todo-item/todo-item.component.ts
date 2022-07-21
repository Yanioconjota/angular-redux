import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';

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

  constructor() {}

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
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
