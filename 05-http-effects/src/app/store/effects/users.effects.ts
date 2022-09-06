import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map } from 'rxjs/operators';
import * as userActions from "../actions";
import { UserService } from '../../services/user.service';

//An effect is basically a service
@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private usersService: UserService) {}

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType( userActions.loadUsers ),
      //tap help us to see how the data is flowing but it's not necessary
      tap( data => console.log('effect tap: ', data)),
      mergeMap(
        () => this.usersService.getUsers()
                    .pipe(
                      tap( data => console.log('getUsers effect: ', data) ),
                      map( users => userActions.loadUsersSucess({ users: users }))
                    )
      )
    )
  );

}
