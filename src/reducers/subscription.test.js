import {
  SUBSCRIPTION_LOADING,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_LOAD,
  SUBSCRIPTION_REMOVE_SUCCESS,
  SUBSCRIPTION_CLEAN,
} from '../actions/subscription';

import reducer from './subscription';

describe('Subscription reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: false,
      success: false,
      subscriptions: [],
    });
  });

  it('should handle SUBSCRIPTION_LOADING action', () => {
    expect(reducer({}, { type: SUBSCRIPTION_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });

  it('should handle SUBSCRIPTION_LOAD action', () => {
    expect(reducer({}, { type: SUBSCRIPTION_LOAD, subscriptions: [{ id: 'abc' }] })).toEqual({
      loading: false,
      error: false,
      success: true,
      subscriptions: [{ id: 'abc' }],
    });
  });

  it('should handle SUBSCRIPTION_SUCCESS action', () => {
    expect(reducer({ subscriptions: [] }, { type: SUBSCRIPTION_SUCCESS, subscription: { id: 'abc' } })).toEqual({
      loading: false,
      error: false,
      success: true,
      subscriptions: [{ id: 'abc' }],
    });
  });

  it('should handle SUBSCRIPTION_ERROR action', () => {
    expect(reducer({}, { type: SUBSCRIPTION_ERROR })).toEqual({
      loading: false,
      error: true,
      success: false,
    });
  });

  it('should handle SUBSCRIPTION_REMOVE_SUCCESS action', () => {
    expect(
      reducer(
        {
          loading: false,
          error: false,
          success: true,
          subscriptions: [{ category: 'abc' }, { category: 'cde' }],
        },
        { type: SUBSCRIPTION_REMOVE_SUCCESS, subscription: { category: 'abc' } }
      )
    ).toEqual({
      loading: false,
      error: false,
      success: true,
      subscriptions: [{ category: 'cde' }],
    });
  });

  it('should handle SUBSCRIPTION_CLEAN action', () => {
    expect(reducer({}, { type: SUBSCRIPTION_CLEAN })).toEqual({
      subscriptions: [],
    });
  });
});
