import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import * as userActions from "../actions";
import { UserService } from '../../services/user.service';
import { of } from "rxjs";

//An effect is basically a service
@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private usersService: UserService) {}

  loadUser$ = createEffect(
    () => this.actions$.pipe(
      ofType( userActions.loadUser ),
      //tap help us to see how the data is flowing but it's not necessary
      tap( id => console.log('effect tap: ', id)),
      mergeMap(
        (action) => this.usersService.getUserById(action.id)
                    .pipe(
                      tap( data => console.log('getUserById effect: ', data) ),
                      map( user => userActions.loadUserSucess({ user: user })),
                      catchError( err => of(userActions.loadUserError({ payload: err })))
                    )
      )
    )
  );

}
