import {
  LOGIN_MODAL,
  REGISTER_MODAL,
  ADD_CATEGORY_MODAL,
  ADD_POST_MODAL,
  EDIT_POST_MODAL,
  CONFIRM_MODAL,
  EDIT_COMMENT,
  EDIT_SORT,
} from '../actions/ui';

import reducer, { initilState } from './ui';

describe('UI reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initilState);
  });

  it('should handle LOGIN_MODAL action', () => {
    expect(reducer({}, { type: LOGIN_MODAL, opened: true })).toEqual({
      isLoginOpened: true,
      isRegisterOpened: false,
      isAddCategoryOpened: false,
      isAddPostOpened: false,
      editPostId: false,
      editComment: undefined,
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
    });
  });

  it('should handle REGISTER_MODAL action', () => {
    expect(reducer({}, { type: REGISTER_MODAL, opened: true })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: true,
      isAddCategoryOpened: false,
      isAddPostOpened: false,
      editPostId: false,
      editComment: undefined,
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
    });
  });

  it('should handle ADD_CATEGORY_MODAL action', () => {
    expect(reducer({}, { type: ADD_CATEGORY_MODAL, opened: true })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: false,
      isAddCategoryOpened: true,
      isAddPostOpened: false,
      editPostId: false,
      editComment: undefined,
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
    });
  });

  it('should handle ADD_POST_MODAL action', () => {
    expect(reducer({}, { type: ADD_POST_MODAL, opened: true })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: false,
      isAddCategoryOpened: false,
      isAddPostOpened: true,
      editPostId: false,
      editComment: undefined,
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
    });
  });

  it('should handle EDIT_POST_MODAL action', () => {
    expect(reducer({}, { type: EDIT_POST_MODAL, opened: true, postId: 'abc' })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: false,
      isAddCategoryOpened: false,
      isAddPostOpened: true,
      editPostId: 'abc',
      editComment: undefined,
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
    });
  });

  it('should handle CONFIRM_MODAL action', () => {
    expect(reducer({}, { type: CONFIRM_MODAL, opened: true, title: 'title', item: { id: 'abc' } })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: false,
      isAddCategoryOpened: false,
      isAddPostOpened: false,
      editPostId: false,
      editComment: undefined,
      isConfirmModalOpened: true,
      confirmModalTitle: 'title',
      confirmModalItemToRemove: { id: 'abc' },
    });
  });

  it('should handle EDIT_COMMENT action', () => {
    expect(reducer({}, { type: EDIT_COMMENT, comment: { id: 'abc' } })).toEqual({
      isLoginOpened: false,
      isRegisterOpened: false,
      isAddCategoryOpened: false,
      isAddPostOpened: false,
      editPostId: false,
      editComment: { id: 'abc' },
      isConfirmModalOpened: false,
      confirmModalTitle: undefined,
      confirmModalItemToRemove: undefined,
    });
  });

  it('should handle EDIT_SORT action', () => {
    expect(reducer({}, { type: EDIT_SORT, sort: 'name' })).toEqual({
      sort: 'name',
    });
  });
});
