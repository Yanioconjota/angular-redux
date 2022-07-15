
export interface Action {
  type: string;
  payload?: any;
}

//El reducer es una función que va a regresar el estado/state, una variable del mismo tipo que reciba <T>
export interface Reducer<T> {
  ( state: T, action: Action ): T
}