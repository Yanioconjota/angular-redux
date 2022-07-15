import {createStore, Store} from 'redux';
import { incrementAction, decrementAction, multiplyAction, divideAction, resetAction } from './contador/contador.actions';
import { counterReducer } from './contador/contador.reducer';

//la función createStore de redux vanilla regresa un store inicializado
const store: Store = createStore(counterReducer);

store.subscribe(()=>{
  console.log('Store:', store.getState());
})

store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(multiplyAction);
store.dispatch(divideAction);
store.dispatch(resetAction);

