import {
  POST_LOADING,
  POST_SUCCESS,
  POST_EDIT_SUCCESS,
  POST_ERROR,
  POST_LOAD,
  POST_VOTE_SUCCESS,
  POST_DELETE_SUCCESS,
  POST_INCREMENT_COMMENT,
} from '../actions/posts';

import reducer from './posts';

describe('Posts reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: false,
      success: false,
      posts: [],
    });
  });

  it('should handle POST_LOADING action', () => {
    expect(reducer({}, { type: POST_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });

  it('should handle POST_LOAD action', () => {
    expect(reducer({}, { type: POST_LOAD, posts: [{ id: 'abc' }] })).toEqual({
      loading: false,
      error: false,
      success: true,
      posts: [{ id: 'abc' }],
    });
  });

  it('should handle POST_SUCCESS action', () => {
    expect(reducer({ posts: [] }, { type: POST_SUCCESS, post: { id: 'abc' } })).toEqual({
      loading: false,
      error: false,
      success: true,
      posts: [{ id: 'abc' }],
    });
  });

  it('should handle POST_EDIT_SUCCESS action', () => {
    expect(
      reducer(
        { posts: [{ id: 'abc', category: 'a' }, { id: 'cde', category: 'b' }] },
        { type: POST_EDIT_SUCCESS, post: { id: 'abc', category: 'b' } }
      )
    ).toEqual({
      loading: false,
      error: false,
      success: true,
      posts: [{ id: 'abc', category: 'b' }, { id: 'cde', category: 'b' }],
    });
  });

  it('should handle POST_ERROR action', () => {
    expect(reducer({}, { type: POST_ERROR })).toEqual({
      loading: false,
      error: true,
      success: false,
      posts: [],
    });
  });

  it('should handle POST_VOTE_SUCCESS action', () => {
    expect(
      reducer({ posts: [{ id: 'cde', voteScore: 9 }, { id: 'abc', voteScore: 9 }] }, { type: POST_VOTE_SUCCESS, post: { id: 'abc' }, voteScore: 10 })
    ).toEqual({
      posts: [{ id: 'cde', voteScore: 9 }, { id: 'abc', voteScore: 10 }],
    });
  });

  it('should handle POST_DELETE_SUCCESS action', () => {
    expect(reducer({ posts: [{ id: 'abc' }, { id: 'cde' }] }, { type: POST_DELETE_SUCCESS, post: { id: 'abc' } })).toEqual({
      posts: [{ id: 'cde' }],
    });
  });

  it('should handle POST_INCREMENT_COMMENT action', () => {
    expect(
      reducer(
        { posts: [{ id: 'abc', commentCount: 0 }, { id: 'cde', commentCount: 0 }] },
        { type: POST_INCREMENT_COMMENT, post: { id: 'abc' }, newCounter: 1 }
      )
    ).toEqual({
      posts: [{ id: 'abc', commentCount: 1 }, { id: 'cde', commentCount: 0 }],
    });
  });
});
