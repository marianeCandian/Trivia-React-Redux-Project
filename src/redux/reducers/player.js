import { ASSERTION_ACTION, LOGIN_ACTION, SCORE_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      ...action.user,
    };
  case SCORE_ACTION:
    return {
      ...state,
      score: state.score + action.score,
    };
  case ASSERTION_ACTION:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  default:
    return state;
  }
};

export default player;
