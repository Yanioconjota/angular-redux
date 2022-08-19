import { IncomeExpenses } from './../models/income-expenses.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService) { }

  createIncomeExpenses(incomeExpenses: IncomeExpenses): Promise<void> {

    const uid = this.authService.user.uid;

    console.log(uid);

    //this way we create a new firebase collection by passing its name as a string 'items' and pass the incomeExpenses as a new object
    return this.firestore.doc(`${ uid }/income-expenses`)
        .collection('items')
        .add({...incomeExpenses})
        .then( ref => console.log(`${ref.id} added successfully`))
        .catch(console.warn);

  }

  initIncomeExpensesListener(uid: string | undefined ) {
    return this.firestore.collection(`${ uid }/income-expenses/items`)
      //Create a stream of synchronized changes. This method keeps the local array in sorted query order. --> we use it to gather firebase id from item
      .snapshotChanges()
      .pipe(
        //we return a mapped snapshot with the firebase doc id
        //The first map is an rxjs operator, the seond one is an array method to return the data in the way we desire
        map(snapshot => snapshot.map( doc => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as IncomeExpenses
            })
          )
        )
      );
  }
}
