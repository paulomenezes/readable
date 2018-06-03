import { LOGIN_MODAL, REGISTER_MODAL } from '../actions/ui';

const initilState = {
  isLoginOpened: false,
  isRegisterOpened: false
};

function reducer(state = initilState, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return {
        isLoginOpened: action.opened,
        isRegisterOpened: false
      };
    case REGISTER_MODAL:
      return {
        isLoginOpened: false,
        isRegisterOpened: action.opened
      };
    default:
      return state;
  }
}

export default reducer;
