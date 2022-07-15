import { decrementAction, divideAction, incrementAction, multiplyAction, resetAction } from "./contador/contador.actions";
import { counterReducer } from "./contador/contador.reducer";

console.log(counterReducer(10, incrementAction)); //11

console.log(counterReducer(10, decrementAction)); //9

console.log(counterReducer(10, multiplyAction)); //20

console.log(counterReducer(10, divideAction)); //5

console.log(counterReducer(10, resetAction)); //0