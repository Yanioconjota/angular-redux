import { Action } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';


//the default reducer using instead of a switch

//export const initialState = 10;
// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );

export const counterReducer = (state = 10, action: Action) => {
  switch (action.type) {

    case increment.type:
      return state + 1;

    case decrement.type:
      return state - 1;

    case reset.type:
      return state = 0;

    default:
      return state;
  }
}
