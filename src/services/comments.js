import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getByPostId = postId => fetch(url('comments/' + postId));

export const insertComment = comment =>
  fetch(url(`comments/${comment.postId}/${comment.id}`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

export const vote = (comment, newScore) =>
  fetch(url(`comments/${comment.postId}/${comment.id}/voteScore`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });

export const remove = comment =>
  fetch(url(`comments/${comment.postId}/${comment.id}/deleted`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(true),
  });
