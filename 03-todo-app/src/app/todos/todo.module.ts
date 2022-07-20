import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//NgRx
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todo.reducer';

//Components
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

//StoreModule: saves the todos and binds the todoReducer and its actions to it

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoFooterComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoPageComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ todos: todoReducer })
  ],
  exports: [
    TodoPageComponent
  ]
})
export class TodoModule { }
