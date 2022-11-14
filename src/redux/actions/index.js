export const LOGIN_ACTION = 'LOGIN_ACTION';
export const SCORE_ACTION = 'SCORE_ACTION';

export function loginAction(user) {
  return {
    type: LOGIN_ACTION,
    user,
  };
}

export const scoreAction = (score) => ({
  type: SCORE_ACTION,
  score,
});
