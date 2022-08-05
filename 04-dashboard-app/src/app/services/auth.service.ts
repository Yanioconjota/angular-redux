import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  //Listens to all auth changes
  initAuthListener() {
    //receibes a firebase user
    this.auth.authState.subscribe((user)=>{
      if (user) {
        const { displayName, uid, email } = user;
        console.log(displayName, uid, email);
      }
    })
  }

  createUser( name: string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
