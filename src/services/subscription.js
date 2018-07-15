import { API_URL } from '../constants';

const url = params => `${API_URL}${params}.json`;

export const getByUser = username => fetch(url('subscription/' + username));

export const insertSubscription = subscription =>
  fetch(url(`subscription/${subscription.user}/${subscription.category}`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });

export const removeSubscription = subscription =>
  fetch(url(`subscription/${subscription.user}/${subscription.category}`), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
