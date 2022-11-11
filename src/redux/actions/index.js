export const LOGIN_ACTION = 'LOGIN_ACTION';

export function loginAction(user) {
  return {
    type: LOGIN_ACTION,
    user,
  };
}
