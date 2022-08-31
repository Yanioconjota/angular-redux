import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserComponent,
    ListComponent
  ]
})
export class UsersModule { }
