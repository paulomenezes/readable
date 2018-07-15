import { CATEGORY_LOADING, CATEGORY_SUCCESS, CATEGORY_ERROR, CATEGORY_LOAD } from '../actions/categories';

const initialState = {
  loading: false,
  error: false,
  success: false,
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case CATEGORY_LOAD:
      return {
        loading: false,
        error: false,
        success: true,
        categories: action.categories,
      };
    case CATEGORY_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        categories: [...state.categories, action.category],
      };
    case CATEGORY_ERROR:
      return {
        loading: false,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};

export default reducer;
