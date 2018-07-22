import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';

import {
  POST_LOADING,
  POST_LOAD,
  POST_SUCCESS,
  POST_EDIT_SUCCESS,
  POST_ERROR,
  POST_VOTE_SUCCESS,
  POST_DELETE_SUCCESS,
  isLoading,
  postLoad,
  postSuccess,
  postEditSuccess,
  postError,
  postVoteSuccess,
  postDeleteSuccess,
  getAll,
  getByCategory,
  getById,
  insertPost,
  vote,
  removePost,
} from './posts';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  error: false,
  success: false,
  posts: undefined,
});

describe('Posts action creators', () => {
  it('isLoading should dispatch POST_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: POST_LOADING,
      loading: true,
    });
  });

  it('postLoad should dispatch POST_LOAD action', () => {
    expect(postLoad([])).toEqual({
      type: POST_LOAD,
      posts: [],
    });
  });

  it('postSuccess should dispatch POST_SUCCESS action', () => {
    expect(postSuccess({})).toEqual({
      type: POST_SUCCESS,
      post: {},
    });
  });

  it('postEditSuccess should dispatch POST_EDIT_SUCCESS action', () => {
    expect(postEditSuccess('react', {})).toEqual({
      type: POST_EDIT_SUCCESS,
      post: {},
      originalCategory: 'react',
    });
  });

  it('postError should dispatch POST_ERROR action', () => {
    expect(postError()).toEqual({
      type: POST_ERROR,
    });
  });

  it('postVoteSuccess should dispatch POST_VOTE_SUCCESS action', () => {
    expect(postVoteSuccess({}, 1)).toEqual({
      type: POST_VOTE_SUCCESS,
      post: {},
      voteScore: 1,
    });
  });

  it('postDeleteSuccess should dispatch POST_DELETE_SUCCESS action', () => {
    expect(postDeleteSuccess({})).toEqual({
      type: POST_DELETE_SUCCESS,
      post: {},
    });
  });
});
