import {
  LOGIN_MODAL,
  REGISTER_MODAL,
  ADD_CATEGORY_MODAL,
  ADD_POST_MODAL,
  EDIT_POST_MODAL,
  CONFIRM_MODAL,
  EDIT_COMMENT,
  EDIT_SORT,
  loginModal,
  registerModal,
  addCategoryModal,
  addPostModal,
  editPostModal,
  editComment,
  editCommentSuccess,
  confirmModal,
  editSort,
} from './ui.js';

describe('UI action creators', () => {
  it('loginModal should dispatch LOGIN_MODAL action', () => {
    expect(loginModal(true)).toEqual({
      type: LOGIN_MODAL,
      opened: true,
    });
  });

  it('registerModal should dispatch REGISTER_MODAL action', () => {
    expect(registerModal(true)).toEqual({
      type: REGISTER_MODAL,
      opened: true,
    });
  });

  it('addCategoryModal should dispatch ADD_CATEGORY_MODAL action', () => {
    expect(addCategoryModal(true)).toEqual({
      type: ADD_CATEGORY_MODAL,
      opened: true,
    });
  });

  it('addPostModal should dispatch ADD_POST_MODAL action', () => {
    expect(addPostModal(true)).toEqual({
      type: ADD_POST_MODAL,
      opened: true,
    });
  });

  it('editPostModal should dispatch EDIT_POST_MODAL action', () => {
    expect(editPostModal(true, 'abc')).toEqual({
      type: EDIT_POST_MODAL,
      opened: true,
      postId: 'abc',
    });
  });

  it('editComment should dispatch EDIT_COMMENT action', () => {
    expect(editComment({ id: 'abc' })).toEqual({
      type: EDIT_COMMENT,
      comment: { id: 'abc' },
    });
  });

  it('editCommentSuccess should dispatch EDIT_COMMENT action', () => {
    expect(editCommentSuccess({ id: 'abc' })).toEqual({
      type: EDIT_COMMENT,
      comment: { id: 'abc' },
    });
  });

  it('confirmModal should dispatch CONFIRM_MODAL action', () => {
    expect(confirmModal(true, 'title', { id: 'abc' })).toEqual({
      type: CONFIRM_MODAL,
      opened: true,
      title: 'title',
      item: { id: 'abc' },
    });
  });

  it('editSort should dispatch EDIT_SORT action', () => {
    expect(editSort('name')).toEqual({
      type: EDIT_SORT,
      sort: 'name',
    });
  });
});
