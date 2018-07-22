import { confirmModal } from './ui';
import { postIncrementComment } from './posts';
import * as CommentAPI from '../services/comments';
import * as PostAPI from '../services/post';

export const COMMENT_LOADING = 'COMMENT_LOADING';
export const COMMENT_LOAD = 'COMMENT_LOAD';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_ERROR = 'COMMENT_ERROR';
export const COMMENT_VOTE_SUCCESS = 'COMMENT_VOTE_SUCCESS';
export const COMMENT_CLEAN = 'COMMENT_CLEAN';
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
export const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS';

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

export const commentVoteSuccess = (comment, voteScore) => ({
  type: COMMENT_VOTE_SUCCESS,
  comment,
  voteScore,
});

export const commentClean = () => ({
  type: COMMENT_CLEAN,
});

export const commentDeleteSuccess = comment => ({
  type: COMMENT_DELETE_SUCCESS,
  comment,
});

export const commentEditSuccess = comment => ({
  type: COMMENT_EDIT_SUCCESS,
  comment,
});

export const getByPost = post => async dispatch => {
  dispatch(isLoading());

  try {
    const response = await CommentAPI.getByPostId(post.id);
    let comments = await response.json();

    if (comments) {
      comments = Object.values(comments);
    }

    comments = comments.filter(p => !p.deleted);

    dispatch(commentLoad(comments));
  } catch (error) {
    dispatch(commentError());
  }
};

export const insertComment = (post, user, description, originalComment) => async dispatch => {
  dispatch(isLoading());

  if (post && user && description) {
    try {
      const comment = {
        id: originalComment ? originalComment.id : id(),
        postId: post.id,
        timestamp: Date.now(),
        description,
        author: user.username,
        voteScore: originalComment ? originalComment.voteScore : 1,
        deleted: false,
        parentDeleted: false,
      };

      await CommentAPI.insertComment(comment);

      if (originalComment) {
        dispatch(commentEditSuccess(comment));
      } else {
        await PostAPI.incrementcommentCount(post, post.commentCount + 1);

        dispatch(commentSuccess(comment));
        dispatch(postIncrementComment(post, post.commentCount + 1));
      }
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

      dispatch(commentVoteSuccess(comment, voteScore));
    } catch (error) {
      dispatch(commentError());
    }
  }
};

export const removeComment = (comment, post) => async dispatch => {
  if (comment) {
    try {
      await CommentAPI.remove(comment);
      await PostAPI.incrementcommentCount(post, post.commentCount - 1);

      dispatch(commentDeleteSuccess(comment));
      dispatch(confirmModal(false, undefined, undefined));
      dispatch(postIncrementComment(post, post.commentCount - 1));
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
