import { combineReducers } from 'redux';
import user from './user';
import reduceTime from './reduceTime';
// import token from './token';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ user, reduceTime });

export default rootReducer;
