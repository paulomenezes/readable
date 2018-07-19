import { POST_LOADING, POST_SUCCESS, POST_ERROR, POST_LOAD, POST_VOTE_SUCCESS } from '../actions/posts';

const initialState = {
  loading: false,
  error: false,
  success: false,
  posts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case POST_LOAD:
      return {
        loading: false,
        error: false,
        success: true,
        posts: action.posts,
      };
    case POST_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        posts: [...state.posts, action.posts],
      };
    case POST_ERROR:
      return {
        loading: false,
        error: true,
        success: false,
      };
    case POST_VOTE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(p => (p.id === action.post.id ? action.post : p)),
      };
    default:
      return state;
  }
};

export default reducer;
