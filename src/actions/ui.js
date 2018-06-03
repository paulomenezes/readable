export const LOGIN_MODAL = 'LOGIN_MODAL';
export const REGISTER_MODAL = 'REGISTER_MODAL';

export const loginModal = opened => ({
  type: LOGIN_MODAL,
  opened
});

export const registerModal = opened => ({
  type: REGISTER_MODAL,
  opened
});
