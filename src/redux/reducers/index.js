import { combineReducers } from 'redux';
import player from './player';
import token from './token';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ player, token });

export default rootReducer;
