import { NgModule , LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Locale
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
registerLocaleData(localeEsAr, 'es-Ar');

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { environment } from '../environments/environment';

//Components
import { AppComponent } from './app.component';

//NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgChartsModule } from 'ng2-charts';

//Custom Modules
import { AuthModule } from './auth/auth.module';
import { IncomeExpensesModule } from './income-expenses/income-expenses.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    //IncomeExpensesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgChartsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Ar' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
