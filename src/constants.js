export const API_URL = 'https://inductive-actor-713.firebaseio.com/';

export function id() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
