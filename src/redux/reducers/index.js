import { combineReducers } from 'redux';
import user from './user';
import token from './token';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ user, token });

export default rootReducer;
