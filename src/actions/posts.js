import { addPostModal } from './ui';
import * as PostAPI from '../services/post';

export const POST_LOADING = 'POST_LOADING';
export const POST_LOAD = 'POST_LOAD';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';

export const isLoading = (loading = true) => ({
  type: POST_LOADING,
  loading,
});

export const postLoad = posts => ({
  type: POST_LOAD,
  posts,
});

export const postSuccess = post => ({
  type: POST_SUCCESS,
  post,
});

export const postError = () => ({
  type: POST_ERROR,
});

export const getAll = () => async dispatch => {
  try {
    const response = await PostAPI.getAll();
    let posts = await response.json();

    if (posts) {
      posts = Object.values(posts).map(p => p[Object.keys(p)[0]]);
    }

    dispatch(postLoad(posts));
  } catch (error) {
    dispatch(postError());
  }
};

export const getByCategory = category => async dispatch => {
  dispatch(isLoading());

  try {
    const response = await PostAPI.getByCategory(category);
    let posts = await response.json();

    if (posts) {
      posts = Object.values(posts);
    }

    dispatch(postLoad(posts));
  } catch (error) {
    dispatch(postError());
  }
};

export const insertPost = ({ name, description, category, user }) => async dispatch => {
  dispatch(isLoading());

  if (name && description) {
    try {
      const post = {
        id: id(),
        timestamp: Date.now(),
        author: user.username,
        category,
        voteScore: 1,
        deleted: false,
        name,
        description,
      };

      await PostAPI.insertPost(post);

      dispatch(postSuccess(post));
      dispatch(addPostModal(false));
    } catch (error) {
      dispatch(postError());
    }
  }
};

function id() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
