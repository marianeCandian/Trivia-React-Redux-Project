import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...action.user,
    };
  default:
    return state;
  }
};

export default user;
