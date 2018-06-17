import { USER_LOADING, USER_SUCCESS, USER_ERROR, userError } from '../actions/user';

const initialState = {
  loading: false,
  error: false,
  success: false,
  user: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case USER_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        user: action.user
      };
    case USER_ERROR:
      return {
        loading: false,
        error: true,
        success: false,
        user: undefined
      };
    default:
      return state;
  }
};

export default reducer;
