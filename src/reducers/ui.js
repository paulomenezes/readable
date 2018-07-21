import { LOGIN_MODAL, REGISTER_MODAL, ADD_CATEGORY_MODAL, ADD_POST_MODAL, EDIT_POST_MODAL } from '../actions/ui';

const initilState = {
  isLoginOpened: false,
  isRegisterOpened: false,
  isAddCategoryOpened: false,
  isAddPostOpened: false,
  editPostId: false,
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
      };
    case REGISTER_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: action.opened,
        isAddCategoryOpened: false,
        isAddPostOpened: false,
        editPostId: false,
      };
    case ADD_CATEGORY_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: action.opened,
        isAddPostOpened: false,
        editPostId: false,
      };
    case ADD_POST_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: false,
      };
    case EDIT_POST_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: false,
        isAddCategoryOpened: false,
        isAddPostOpened: action.opened,
        editPostId: action.postId,
      };
    default:
      return state;
  }
}

export default reducer;
