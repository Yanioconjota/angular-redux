 //Acciones
interface Action {
  type: string;
  payload?: any;
}

// const incrementAction: Action = {
//   type: 'INCREMENT'
// };

const reducer = (state = 10, action: Action) => {

  // if(action.type === 'INCREMENT') {
  //   return state += 1;
  // }

  // return state;

  switch (action.type) {
    case 'INCREMENT':
      return state += 1;

    case 'DECREMENT':
      return state -= 1;
    
    case 'MULTIPLY':
      return state * action.payload;
    
    case 'DIVIDE':
      return state / action.payload;
  
    default:
      return state;
  }
};

//USE REDUCER
const incrementAction: Action = {
  type: 'INCREMENT'
};

console.log(reducer(10, incrementAction)); //11

const decrementAction: Action = {
  type: 'DECREMENT'
};

console.log(reducer(10, decrementAction)); //9

const multiplyAction: Action = {
  type: 'MULTIPLY',
  payload: 2
};

console.log(reducer(10, multiplyAction)); //20

const divideAction: Action = {
  type: 'DIVIDE',
  payload: 2
};

console.log(reducer(10, divideAction)); //5