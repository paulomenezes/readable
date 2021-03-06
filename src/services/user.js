import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getUser = username => fetch(url('users/' + username));

export const insertUser = user =>
  fetch(url('users/' + user.username), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
