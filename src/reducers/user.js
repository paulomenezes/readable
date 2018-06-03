import { CHECK_USER_AVAILABLE, CHECK_USER_LOADING } from '../actions/user';

const initialState = {
  loading: false,
  available: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER_AVAILABLE:
      return {
        loading: false,
        available: action.available
      };
    case CHECK_USER_LOADING:
      return {
        loading: action.loading
      };
    default:
      return state;
  }
};

export default reducer;
