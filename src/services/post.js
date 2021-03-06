import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getAll = () => fetch(url('posts'));

export const getByCategory = category => fetch(url('posts/' + category));

export const getById = (category, id) => fetch(url(`posts/${category}/${id}`));

export const insertPost = post =>
  fetch(url(`posts/${post.category}/${post.id}`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

export const deletePost = (category, id) =>
  fetch(url(`posts/${category}/${id}`), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const vote = (post, newScore) =>
  fetch(url(`posts/${post.category}/${post.id}/voteScore`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });

export const incrementcommentCount = (post, newCounter) =>
  fetch(url(`posts/${post.category}/${post.id}/commentCount`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCounter),
  });

export const remove = post =>
  fetch(url(`posts/${post.category}/${post.id}/deleted`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(true),
  });
