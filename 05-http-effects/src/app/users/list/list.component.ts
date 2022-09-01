import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe( users => {
    //   console.log(users);
    //   this.users = users;
    // });
  }

}
