export const LOGIN_ACTION = 'LOGIN_ACTION';
export const SCORE_ACTION = 'SCORE_ACTION';
export const ASSERTION_ACTION = 'ASSERTION_ACTION';
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

export const assertionAction = (assertions) => ({
  type: ASSERTION_ACTION,
  assertions,
});
