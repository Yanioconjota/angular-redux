import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//Custom reducer
import { counterReducer } from './counter/counter.reducer';

import { AppComponent } from './app.component';
import { ChildComponent } from './counter/child/child.component';
import { GrandchildComponent } from './counter/grandchild/grandchild.component';
import { NgrxExampleComponent } from './counter/ngrx-example/ngrx-example.component';


@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    GrandchildComponent,
    NgrxExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
