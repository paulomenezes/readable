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

export const initilState = {
  isLoginOpened: false,
  isRegisterOpened: false,
  isAddCategoryOpened: false,
  isAddPostOpened: false,
  editPostId: false,
  editComment: undefined,
  editCommentPost: undefined,
  isConfirmModalOpened: false,
  confirmModalTitle: undefined,
  confirmModalItemToRemove: undefined,
  sort: 'votes',
};

function reducer(state = initilState, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return {
        ...state,
        isLoginOpened: action.opened,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case REGISTER_MODAL:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: action.opened,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case ADD_CATEGORY_MODAL:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: action.opened,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case ADD_POST_MODAL:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case EDIT_POST_MODAL:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: action.postId,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case CONFIRM_MODAL:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        editCommentPost: action.post,
        isConfirmModalOpened: action.opened,
        confirmModalTitle: action.title,
        confirmModalItemToRemove: action.item,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: action.comment,
        editCommentPost: action.post,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    case EDIT_SORT:
      return {
        ...state,
        sort: action.sort,
      };
    default:
      return state;
  }
}

export default reducer;
