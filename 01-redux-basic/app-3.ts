import { incrementAction, decrementAction, multiplyAction, divideAction, resetAction } from "./contador/contador.actions";
import { counterReducer } from "./contador/contador.reducer";
import { Action, Reducer } from "./ngrx-fake/ngrx";

//El Store y el state comparten el mismo tipo que es este caso es genérico <T>
class Store<T> {
  //El reducer nos pide aclarar el tipo de información maneja el reducer, que es la misma del estado/state, que es dek tipo genérico
  constructor(private reducer: Reducer<T>, private state: T) {}

  //retorna el estado
  getState() {
    return this.state;
  }
  
  //recibe una acción y la ejecuta, cambiando el estado de acuerdo a la acción que reciba el reducer
  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }


}

//Creamos una nueva instancia del store y esta nos va a pedir un reducer y el estado/state
const store = new Store(counterReducer, 10);

//para poder acceder al estado del store usamos un getState()
console.log(store.getState()); //10 --> EL estado que le estamos pasando sin alterar

//se ejecuta la acción recibida
store.dispatch(incrementAction);

//imprimimos el resultado accediendo nuevamente al store
console.log(store.getState());//11

//se ejecuta la acción recibida
store.dispatch(decrementAction);

//imprimimos el resultado accediendo nuevamente al store
console.log(store.getState());//10 --> porque estamos trabajando con un estado único

//multiplica el estado por 2
store.dispatch(multiplyAction);
console.log(store.getState())//20

//divide el estado entre 2
store.dispatch(divideAction);
console.log(store.getState())//10

//le asigna 0 al estado
store.dispatch(resetAction);
console.log(store.getState())//0
