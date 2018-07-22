export const LOGIN_MODAL = 'LOGIN_MODAL';
export const REGISTER_MODAL = 'REGISTER_MODAL';
export const ADD_CATEGORY_MODAL = 'ADD_CATEGORY_MODAL';
export const ADD_POST_MODAL = 'ADD_POST_MODAL';
export const EDIT_POST_MODAL = 'EDIT_POST_MODAL';
export const CONFIRM_MODAL = 'CONFIRM_MODAL';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_SORT = 'EDIT_SORT';

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

export const editPostModal = (opened, postId) => ({
  type: EDIT_POST_MODAL,
  opened,
  postId,
});

export const editComment = (comment, post) => ({
  type: EDIT_COMMENT,
  comment,
  post,
});

export const editCommentSuccess = comment => ({
  type: EDIT_COMMENT,
  comment,
});

export const confirmModal = (opened, title, item, post) => ({
  type: CONFIRM_MODAL,
  opened,
  title,
  item,
  post,
});

export const editSort = sort => ({
  type: EDIT_SORT,
  sort,
});
