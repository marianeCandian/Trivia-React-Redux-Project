import { CHRONOMETER } from '../actions';

const INICIAL_STATE = {
  time: 30,
};

const reduceTime = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case CHRONOMETER:
    return {
      ...state,
      time: action.payload,
    };
  default: return state;
  }
};

export default reduceTime;
