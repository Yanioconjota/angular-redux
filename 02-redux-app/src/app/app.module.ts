import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//NgRx Store
import { StoreModule } from '@ngrx/store';
//Custom reducer
import { counterReducer } from './counter/counter.reducer';

import { AppComponent } from './app.component';
import { ChildComponent } from './counter/child/child.component';
import { GrandchildComponent } from './counter/grandchild/grandchild.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    GrandchildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
