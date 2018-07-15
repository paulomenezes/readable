import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getAll = () => fetch(url('categories'));

export const insertCategory = category =>
  fetch(url('categories/' + category.link), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
