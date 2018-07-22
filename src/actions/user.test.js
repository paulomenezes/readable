import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';
import localStorage from '../__test-helpers__/localStorage';

import { REGISTER_MODAL, LOGIN_MODAL } from './ui';
import { SUBSCRIPTION_CLEAN } from './subscription';
import { USER_LOADING, USER_SUCCESS, USER_ERROR, isLoading, userSuccess, userError, loadUser, insertUser, login, logout } from './user';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  error: false,
  success: false,
  user: undefined,
});

describe('User action creators', () => {
  it('isLoading should dispatch USER_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: USER_LOADING,
      loading: true,
    });
  });

  it('userSuccess should dispatch USER_SUCCESS action', () => {
    expect(userSuccess({ username: 'paulo' })).toEqual({
      type: USER_SUCCESS,
      user: { username: 'paulo' },
    });
  });

  it('userError should dispatch USER_ERROR action', () => {
    expect(userError()).toEqual({
      type: USER_ERROR,
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch loadUser calls userSuccess', () => {
    window.localStorage = localStorage.successful(JSON.stringify({ name: 'Paulo', username: 'paulo' }));

    const expectedActions = [
      {
        type: USER_SUCCESS,
        user: { name: 'Paulo', username: 'paulo' },
      },
    ];

    store.dispatch(loadUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch loadUser without user nothing happens', () => {
    window.localStorage = localStorage.successful(undefined);

    const expectedActions = [];

    store.dispatch(loadUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertUser calls isLoading, userSuccess and registerModal actions', async () => {
    window.fetch = fetch.successful();
    window.localStorage = localStorage;

    const expectedActions = [
      { type: USER_LOADING, loading: true },
      {
        type: USER_SUCCESS,
        user: { name: 'Paulo', username: 'paulo' },
      },
      { type: REGISTER_MODAL, opened: false },
    ];

    await store.dispatch(insertUser({ name: 'Paulo', username: 'paulo', password: '123' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch failure insertUser calls isLoading and userError actions', async () => {
    window.fetch = fetch.failing();
    window.localStorage = localStorage;

    const expectedActions = [{ type: USER_LOADING, loading: true }, { type: USER_ERROR }];

    await store.dispatch(insertUser({ name: 'Paulo', username: 'paulo', password: '123' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertUser with no params nothing happens', async () => {
    const expectedActions = [{ type: USER_LOADING, loading: true }];

    await store.dispatch(insertUser({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch login calls isLoading, userSuccess and loginModal actions', async () => {
    window.fetch = fetch.successful({ name: 'Paulo', username: 'paulo', password: '123' });
    window.localStorage = localStorage;

    const expectedActions = [
      { type: USER_LOADING, loading: true },
      {
        type: USER_SUCCESS,
        user: { name: 'Paulo', username: 'paulo', password: '123' },
      },
      { type: LOGIN_MODAL, opened: false },
    ];

    await store.dispatch(login({ username: 'paulo', password: '123' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch login with invalid params calls isLoading and userError actions', async () => {
    window.fetch = fetch.successful();
    window.localStorage = localStorage;

    const expectedActions = [{ type: USER_LOADING, loading: true }, { type: USER_ERROR }];

    await store.dispatch(login({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch failure login calls isLoading and userError actions', async () => {
    window.fetch = fetch.failing();
    window.localStorage = localStorage;

    const expectedActions = [{ type: USER_LOADING, loading: true }, { type: USER_ERROR }];

    await store.dispatch(login({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch logout calls userSuccess and cleanSubscription', () => {
    window.localStorage = localStorage;

    const expectedActions = [
      {
        type: USER_SUCCESS,
        user: undefined,
      },
      {
        type: SUBSCRIPTION_CLEAN,
      },
    ];

    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
