import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';

import { CHECK_USER_AVAILABLE, CHECK_USER_LOADING, checkUserAvailable, isLoading, checkUsernameAvailability } from './userCheck';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  available: false,
});

describe('User Check action creators', () => {
  it('checkUserAvailable should dispatch CHECK_USER_AVAILABLE action', () => {
    expect(checkUserAvailable(true)).toEqual({
      type: CHECK_USER_AVAILABLE,
      available: true,
    });
  });

  it('isLoading should dispatch CHECK_USER_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: CHECK_USER_LOADING,
      loading: true,
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch checkUsernameAvailability with an empty username calls isLoading and checkUserAvailable actions and return available', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [{ type: CHECK_USER_LOADING, loading: true }, { type: CHECK_USER_AVAILABLE, available: true }];

    await store.dispatch(checkUsernameAvailability());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch checkUsernameAvailability with a valid username calls isLoading and checkUserAvailable actions and return available', async () => {
    window.fetch = fetch.successful({ username: 'paulo' });

    const expectedActions = [{ type: CHECK_USER_LOADING, loading: true }, { type: CHECK_USER_AVAILABLE, available: 'paulo' }];

    await store.dispatch(checkUsernameAvailability('paulo'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch checkUsernameAvailability calls isLoading and checkUserAvailable with available username', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [{ type: CHECK_USER_LOADING, loading: true }, { type: CHECK_USER_AVAILABLE, available: true }];

    await store.dispatch(checkUsernameAvailability('paulo'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
