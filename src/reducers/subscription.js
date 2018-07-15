import {
  SUBSCRIPTION_LOADING,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_LOAD,
  SUBSCRIPTION_REMOVE_SUCCESS,
} from '../actions/subscription';

const initialState = {
  loading: false,
  error: false,
  success: false,
  subscriptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SUBSCRIPTION_LOAD:
      return {
        loading: false,
        error: false,
        success: true,
        subscriptions: action.subscriptions,
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        subscriptions: [...state.subscriptions, action.subscription],
      };
    case SUBSCRIPTION_ERROR:
      return {
        loading: false,
        error: true,
        success: false,
      };
    case SUBSCRIPTION_REMOVE_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        subscriptions: state.subscriptions.filter(s => s.category !== action.subscription.category),
      };
    default:
      return state;
  }
};

export default reducer;
