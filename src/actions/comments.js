import * as CommentAPI from '../services/comments';

export const COMMENT_LOADING = 'COMMENT_LOADING';
export const COMMENT_LOAD = 'COMMENT_LOAD';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_ERROR = 'COMMENT_ERROR';
export const COMMENT_VOTE_SUCCESS = 'COMMENT_VOTE_SUCCESS';
export const COMMENT_CLEAN = 'COMMENT_CLEAN';

export const isLoading = (loading = true) => ({
  type: COMMENT_LOADING,
  loading,
});

export const commentLoad = comments => ({
  type: COMMENT_LOAD,
  comments,
});

export const commentSuccess = comment => ({
  type: COMMENT_SUCCESS,
  comment,
});

export const commentError = () => ({
  type: COMMENT_ERROR,
});

export const commentVoteSuccess = comment => ({
  type: COMMENT_VOTE_SUCCESS,
  comment,
});

export const commentClean = () => ({
  type: COMMENT_CLEAN,
});

export const getByPost = post => async dispatch => {
  dispatch(isLoading());

  try {
    const response = await CommentAPI.getByPostId(post.id);
    let comments = await response.json();

    if (comments) {
      comments = Object.values(comments);
    }

    dispatch(commentLoad(comments));
  } catch (error) {
    dispatch(commentError());
  }
};

export const insertComment = (post, user, description) => async dispatch => {
  dispatch(isLoading());

  if (post && user && description) {
    try {
      const comment = {
        id: id(),
        postId: post.id,
        timestamp: Date.now(),
        description,
        author: user.username,
        voteScore: 1,
        deleted: false,
        parentDeleted: false,
      };

      await CommentAPI.insertComment(comment);

      dispatch(commentSuccess(comment));
    } catch (error) {
      dispatch(commentError());
    }
  }
};

export const vote = (comment, type) => async dispatch => {
  if (comment && type) {
    try {
      let voteScore = comment.voteScore;

      if (type === 'up') {
        voteScore += 1;
      } else if (type === 'down') {
        voteScore -= 1;
      }

      await CommentAPI.vote(comment, voteScore);

      comment.voteScore = voteScore;

      dispatch(commentVoteSuccess(comment));
    } catch (error) {
      dispatch(commentError());
    }
  }
};

export const cleanComments = () => dispatch => {
  dispatch(commentClean());
};

function id() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
