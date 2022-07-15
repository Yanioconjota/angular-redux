// const incrementAction: Action = {
//   type: 'INCREMENT'
// };
var reducer = function (state, action) {
    if (state === void 0) { state = 10; }
    if (action.type === 'INCREMENT') {
        return state += 1;
    }
    return state;
};
//USE REDUCER
var incrementAction = {
    type: 'INCREMENT'
};
console.log(reducer(10, incrementAction));
