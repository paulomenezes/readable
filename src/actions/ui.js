export const LOGIN_MODAL = 'LOGIN_MODAL';
export const REGISTER_MODAL = 'REGISTER_MODAL';
export const ADD_CATEGORY_MODAL = 'ADD_CATEGORY_MODAL';
export const ADD_POST_MODAL = 'ADD_POST_MODAL';

export const loginModal = opened => ({
  type: LOGIN_MODAL,
  opened,
});

export const registerModal = opened => ({
  type: REGISTER_MODAL,
  opened,
});

export const addCategoryModal = opened => ({
  type: ADD_CATEGORY_MODAL,
  opened,
});

export const addPostModal = opened => ({
  type: ADD_POST_MODAL,
  opened,
});
