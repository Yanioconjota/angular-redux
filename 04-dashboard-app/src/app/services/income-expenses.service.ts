import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeExpenses } from '../models/income-expenses.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService) { }

  createIncomeExpenses(incomeExpenses: IncomeExpenses): Promise<void> {

    const uid = this.authService.user.uid;

    //this way we create a new firebase collection by passing its name as a string 'items' and pass the incomeExpenses as a new object
    return this.firestore.doc(`${ uid }/income-expenses`)
        .collection('items')
        .add({...incomeExpenses})
        .then( ref => console.log(`${ref} added successfully`))
        .catch(console.warn);

  }
}
