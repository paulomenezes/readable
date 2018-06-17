import { registerModal } from './ui';
import * as UserAPI from '../services/user';

export const USER_LOADING = 'USER_LOADING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const isLoading = (loading = true) => ({
  type: USER_LOADING,
  loading
});

export const userSuccess = user => ({
  type: USER_SUCCESS,
  user
});

export const userError = () => ({
  type: USER_ERROR
});

export const loadUser = () => dispatch => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(userSuccess(JSON.parse(user)));
  }
};

export const insertUser = ({ name, username, password }) => async dispatch => {
  dispatch(isLoading());

  if (name && username && password) {
    try {
      await UserAPI.insertUser({ name, username, password });

      const user = { name, username };

      dispatch(userSuccess(user));
      dispatch(registerModal(false));

      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      dispatch(userError());
    }
  }
};
