import { addPostModal, confirmModal } from './ui';
import * as PostAPI from '../services/post';

export const POST_LOADING = 'POST_LOADING';
export const POST_LOAD = 'POST_LOAD';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_EDIT_SUCCESS = 'POST_EDIT_SUCCESS';
export const POST_ERROR = 'POST_ERROR';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';

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

export const postEditSuccess = (originalCategory, post) => ({
  type: POST_EDIT_SUCCESS,
  post,
  originalCategory,
});

export const postError = () => ({
  type: POST_ERROR,
});

export const postVoteSuccess = (post, voteScore) => ({
  type: POST_VOTE_SUCCESS,
  post,
  voteScore,
});

export const postDeleteSuccess = post => ({
  type: POST_DELETE_SUCCESS,
  post,
});

export const getAll = () => async dispatch => {
  try {
    const response = await PostAPI.getAll();
    const posts = await response.json();

    let postsArray = [];

    if (posts) {
      const keys = Object.keys(posts);
      keys.forEach(key => {
        postsArray = postsArray.concat(Object.values(posts[key]));
      });
    }

    postsArray = postsArray.filter(p => !p.deleted);

    dispatch(postLoad(postsArray));
  } catch (error) {
    console.log(error);
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

    posts = posts.filter(p => !p.deleted);

    dispatch(postLoad(posts));
  } catch (error) {
    dispatch(postError());
  }
};

export const getById = id => async dispatch => {
  dispatch(isLoading());

  try {
    const response = await PostAPI.getAll(id);
    let post = await response.json();

    dispatch(postLoad([post]));
  } catch (error) {
    dispatch(postError());
  }
};

export const insertPost = ({ originalPost, name, description, category, user }) => async dispatch => {
  dispatch(isLoading());

  if (name && description) {
    try {
      const post = {
        id: originalPost ? originalPost.id : id(),
        timestamp: Date.now(),
        author: user.username,
        category,
        voteScore: originalPost ? originalPost.voteScore : 1,
        deleted: false,
        name,
        description,
      };

      await PostAPI.insertPost(post);

      if (originalPost && originalPost.category !== category) {
        await PostAPI.deletePost(originalPost.category, originalPost.id);
        dispatch(postEditSuccess(originalPost.category, post));
      } else if (originalPost) {
        dispatch(postEditSuccess(undefined, post));
      } else {
        dispatch(postSuccess(post));
      }

      dispatch(addPostModal(false));
    } catch (error) {
      dispatch(postError());
    }
  }
};

export const vote = (post, type) => async dispatch => {
  if (post && type) {
    try {
      let voteScore = post.voteScore;

      if (type === 'up') {
        voteScore += 1;
      } else if (type === 'down') {
        voteScore -= 1;
      }

      await PostAPI.vote(post, voteScore);

      dispatch(postVoteSuccess(post, voteScore));
    } catch (error) {
      dispatch(postError());
    }
  }
};

export const removePost = post => async dispatch => {
  if (post) {
    try {
      await PostAPI.remove(post);

      dispatch(postDeleteSuccess(post));
      dispatch(confirmModal(false, undefined, undefined));
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
