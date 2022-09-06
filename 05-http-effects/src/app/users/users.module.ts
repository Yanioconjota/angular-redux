import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    UserComponent,
    ListComponent
  ]
})
export class UsersModule { }
