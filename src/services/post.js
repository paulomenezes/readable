import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getAll = () => fetch(url('posts'));

export const getByCategory = category => fetch(url('posts/' + category));

export const insertPost = post =>
  fetch(url(`posts/${post.category}/${post.id}`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
