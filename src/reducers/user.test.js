import { USER_LOADING, USER_SUCCESS, USER_ERROR } from '../actions/user';

import reducer from './user';

describe('User reducer', () => {
  it('shoudl handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: false,
      success: false,
      user: undefined,
    });
  });

  it('shoudl handle USER_LOADING action', () => {
    expect(reducer({}, { type: USER_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });

  it('shoudl handle USER_SUCCESS action', () => {
    expect(reducer({}, { type: USER_SUCCESS, user: { username: 'paulo' } })).toEqual({
      loading: false,
      error: false,
      success: true,
      user: { username: 'paulo' },
    });
  });

  it('shoudl handle USER_ERROR action', () => {
    expect(reducer({}, { type: USER_ERROR })).toEqual({
      loading: false,
      error: true,
      success: false,
      user: undefined,
    });
  });
});
