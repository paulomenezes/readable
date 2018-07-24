import {
  COMMENT_LOADING,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  COMMENT_LOAD,
  COMMENT_VOTE_SUCCESS,
  COMMENT_CLEAN,
  COMMENT_EDIT_SUCCESS,
  COMMENT_DELETE_SUCCESS,
} from '../actions/comments';

const initialState = {
  loading: false,
  error: false,
  success: false,
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case COMMENT_LOAD:
      return {
        loading: false,
        error: false,
        success: true,
        comments: action.comments,
      };
    case COMMENT_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        comments: [...state.comments, action.comment],
      };
    case COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case COMMENT_VOTE_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(p => (p.id === action.comment.id ? { ...p, voteScore: action.voteScore } : p)),
      };
    case COMMENT_CLEAN:
      return {
        ...state,
        comments: [],
      };
    case COMMENT_EDIT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(c => (c.id === action.comment.id ? action.comment : c)),
      };
    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.comment.id),
      };
    default:
      return state;
  }
};

export default reducer;
