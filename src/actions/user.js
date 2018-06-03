import * as UserAPI from '../services/user';

export const CHECK_USER_AVAILABLE = 'CHECK_USER_AVAILABLE';
export const CHECK_USER_LOADING = 'CHECK_USER_LOADING';

export const checkUserAvailable = available => ({
  type: CHECK_USER_AVAILABLE,
  available
});

export const checkUserLoading = () => ({
  type: CHECK_USER_LOADING,
  loading: true
});

export const checkUsernameAvailability = username => async dispatch => {
  dispatch(checkUserLoading());

  if (username) {
    try {
      const response = await UserAPI.getUser(username);
      const user = await response.json();

      dispatch(checkUserAvailable(user && user.username));
    } catch (error) {
      dispatch(checkUserAvailable(true));
    }
  } else {
    dispatch(checkUserAvailable(true));
  }
};
