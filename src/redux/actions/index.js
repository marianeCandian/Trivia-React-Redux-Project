export const LOGIN_ACTION = 'LOGIN_ACTION';
export const CHRONOMETER = 'CHRONOMETER';

export function loginAction(user) {
  return {
    type: LOGIN_ACTION,
    user,
  };
}

export function timeAction(payload) {
  return {
    type: CHRONOMETER,
    payload,
  };
}
