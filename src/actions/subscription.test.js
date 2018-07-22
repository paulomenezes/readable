import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';

import {
  SUBSCRIPTION_LOADING,
  SUBSCRIPTION_LOAD,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_REMOVE_SUCCESS,
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_CLEAN,
  isLoading,
  subscriptionLoad,
  subscriptionSuccess,
  subscriptionRemoveSuccess,
  subscriptionError,
  subscriptionClean,
  loadSubscriptions,
  insertSubscription,
  cleanSubscription,
} from './subscription';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  error: false,
  success: false,
  subscriptions: undefined,
});

describe('Subscription action creators', () => {
  it('isLoading should dispatch SUBSCRIPTION_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: SUBSCRIPTION_LOADING,
      loading: true,
    });
  });

  it('subscriptionLoad should dispatch SUBSCRIPTION_LOAD action', () => {
    expect(subscriptionLoad([])).toEqual({
      type: SUBSCRIPTION_LOAD,
      subscriptions: [],
    });
  });

  it('subscriptionSuccess should dispatch SUBSCRIPTION_SUCCESS action', () => {
    expect(subscriptionSuccess({ id: 'abc' })).toEqual({
      type: SUBSCRIPTION_SUCCESS,
      subscription: { id: 'abc' },
    });
  });

  it('subscriptionRemoveSuccess should dispatch SUBSCRIPTION_REMOVE_SUCCESS action', () => {
    expect(subscriptionRemoveSuccess({ id: 'abc' })).toEqual({
      type: SUBSCRIPTION_REMOVE_SUCCESS,
      subscription: { id: 'abc' },
    });
  });

  it('subscriptionError should dispatch SUBSCRIPTION_ERROR action', () => {
    expect(subscriptionError()).toEqual({
      type: SUBSCRIPTION_ERROR,
    });
  });

  it('subscriptionClean should dispatch SUBSCRIPTION_CLEAN action', () => {
    expect(subscriptionClean()).toEqual({
      type: SUBSCRIPTION_CLEAN,
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch loadSubscriptions calls subscriptionLoad action', async () => {
    window.fetch = fetch.successful({ react: { category: 'react' }, games: { category: 'games' } });

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOAD,
        subscriptions: [{ category: 'react' }, { category: 'games' }],
      },
    ];

    await store.dispatch(loadSubscriptions('paulo'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatch loadSubscriptions calls subscriptionLoad action when there aren't subscriptions", async () => {
    window.fetch = fetch.successful(undefined);

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOAD,
        subscriptions: undefined,
      },
    ];

    await store.dispatch(loadSubscriptions('paulo'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch loadSubscriptions calls subscriptionError action when failing', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: SUBSCRIPTION_ERROR,
      },
    ];

    await store.dispatch(loadSubscriptions('paulo'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertSubscriptions calls isLoading and subscriptionSuccess action', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOADING,
        loading: true,
      },
      {
        type: SUBSCRIPTION_SUCCESS,
        subscription: { user: 'paulo', category: 'react' },
      },
    ];

    await store.dispatch(insertSubscription({ category: { link: 'react' }, user: { username: 'paulo' } }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertSubscriptions calls only isLoading when params is invalid', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOADING,
        loading: true,
      },
    ];

    await store.dispatch(insertSubscription({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertSubscriptions calls isLoading and subscriptionRemoveSuccess action when already subscribed', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOADING,
        loading: true,
      },
      {
        type: SUBSCRIPTION_REMOVE_SUCCESS,
        subscription: { user: 'paulo', category: 'react' },
      },
    ];

    await store.dispatch(insertSubscription({ category: { link: 'react' }, user: { username: 'paulo' } }, true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertSubscriptions calls isLoading and subscriptionError action when failing', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: SUBSCRIPTION_LOADING,
        loading: true,
      },
      {
        type: SUBSCRIPTION_ERROR,
      },
    ];

    await store.dispatch(insertSubscription({ category: { link: 'react' }, user: { username: 'paulo' } }, true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch cleanSubscription calls subscriptionClean action', async () => {
    const expectedActions = [
      {
        type: SUBSCRIPTION_CLEAN,
      },
    ];

    await store.dispatch(cleanSubscription());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
