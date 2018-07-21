import { CHECK_USER_AVAILABLE, CHECK_USER_LOADING } from '../actions/userCheck';

import reducer from './userCheck';

describe('User Check reducer', () => {
  it('shoudl handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      available: false,
    });
  });

  it('shoudl handle CHECK_USER_AVAILABLE action', () => {
    expect(reducer({}, { type: CHECK_USER_AVAILABLE, available: true })).toEqual({
      loading: false,
      available: true,
    });
  });

  it('shoudl handle CHECK_USER_LOADING action', () => {
    expect(reducer({}, { type: CHECK_USER_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });
});
