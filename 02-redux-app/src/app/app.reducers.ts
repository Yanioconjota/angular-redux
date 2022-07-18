//This interface has the same type declared module in which the stored was imported -->  StoreModule.forRoot({ counter: counterReducer })
export interface AppState {
  counter: number;
}
