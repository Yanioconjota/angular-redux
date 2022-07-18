import { createReducer, on } from '@ngrx/store';
import * as actions from './counter.actions';


//the recomended reducer used instead of a switch

export const initialState = 10;
export const counterReducer = createReducer(
  initialState,
  on(actions.increment, (state) => state + 1),
  on(actions.decrement, (state) => state - 1),
  on(actions.multiply, (state, { number }) => state * number),
  on(actions.divide, (state, { number }) => state / number),
  on(actions.reset, (state) => 0)
);

// export const counterReducer = (state = 10, action: Action) => {
//   switch (action.type) {

//     case increment.type:
//       return state + 1;

//     case decrement.type:
//       return state - 1;

//     case reset.type:
//       return state = 0;

//     default:
//       return state;
//   }
// }
