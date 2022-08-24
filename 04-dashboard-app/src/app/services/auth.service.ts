import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as incomeExpensesActions from '../income-expenses/income-expenses.actions';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscriber: Subscription | undefined;
  private _user!: User | null;

  get user() {
    //prevent alterations on user through spread opeartor
    return {...this._user};
  }

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  //Listens to all auth changes
  initAuthListener() {
    //receibes a firebase user
    this.auth.authState.subscribe((user)=>{
      if (user) {
        const { uid } = user;
        //console.log(uid, email);
        //if we got a fb user we can acces its properties in firebase using its uid.
        this.subscriber = this.firestore.doc(`${ uid }/user`).valueChanges().subscribe(fbUser => {
          //we create a new instance of user with the data received from firebase and dispatch it
          const user = User.fromFirebase(fbUser);
          this._user = user;
          //console.log(user);
          this.store.dispatch(authActions.setUser({user}))
        })
      } else {
        //To avoid persisting user data in the store we unsubscribe from the firebase doc call
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(incomeExpensesActions.unsetItems());
        this.subscriber?.unsubscribe();
      }
    })
  }

  createUser( name: string, email: string, password: string ) {
    //returns a promis with a firebase user
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(
          user?.uid,
          name,
          user?.email
          );
        //creates a document in firestore in the specified path
        return this.firestore.doc(`${user?.uid}/user`)
          //sets the data from newUser to that path
          //Since firebase doesn't allow an instance of a class we use the spread operator to pass a new object.

          /*Function DocumentReference.set() called with invalid data. Data must be an object, but it was: a custom User object (found in document bOV7WwKvV3f3vmjzvo64ODT44IG3/user) */
          .set({...newUser})
      })
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((fbUser: any) => fbUser !== null)
    )
  }
}
