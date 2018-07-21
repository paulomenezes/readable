import { LOGIN_MODAL, REGISTER_MODAL, ADD_CATEGORY_MODAL, ADD_POST_MODAL, EDIT_POST_MODAL, CONFIRM_MODAL, EDIT_COMMENT } from '../actions/ui';

export const initilState = {
  isLoginOpened: false,
  isRegisterOpened: false,
  isAddCategoryOpened: false,
  isAddPostOpened: false,
  editPostId: false,
  editComment: undefined,
  isConfirmModalOpened: false,
  confirmModalTitle: undefined,
  confirmModalItemToRemove: undefined,
};

function reducer(state = initilState, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return {
        isLoginOpened: action.opened,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
      };
    case REGISTER_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: action.opened,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
      };
    case ADD_CATEGORY_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: action.opened,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
      };
    case ADD_POST_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
      };
    case EDIT_POST_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: action.postId,
        editComment: undefined,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
      };
    case CONFIRM_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: undefined,
        isConfirmModalOpened: action.opened,
        confirmModalTitle: action.title,
        confirmModalItemToRemove: action.item,
      };
    case EDIT_COMMENT:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
        editComment: action.comment,
        isConfirmModalOpened: false,
        confirmModalTitle: undefined,
        confirmModalItemToRemove: undefined,
      };
    default:
      return state;
  }
}

export default reducer;
