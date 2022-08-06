import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  //Listens to all auth changes
  initAuthListener() {
    //receibes a firebase user
    this.auth.authState.subscribe((user)=>{
      if (user) {
        const { uid, email } = user;
        console.log(uid, email);
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
