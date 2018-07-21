import {
  COMMENT_LOADING,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  COMMENT_LOAD,
  COMMENT_VOTE_SUCCESS,
  COMMENT_CLEAN,
  COMMENT_EDIT_SUCCESS,
  COMMENT_DELETE_SUCCESS,
} from '../actions/comments';

import reducer from './comments';

describe('Comments reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: false,
      success: false,
      comments: [],
    });
  });

  it('should handle COMMENT_LOADING action', () => {
    expect(reducer({}, { type: COMMENT_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });

  it('should handle COMMENT_LOAD action', () => {
    expect(reducer({}, { type: COMMENT_LOAD, comments: [{ id: 'abc' }] })).toEqual({
      loading: false,
      error: false,
      success: true,
      comments: [{ id: 'abc' }],
    });
  });

  it('should handle COMMENT_SUCCESS action', () => {
    expect(reducer({ comments: [] }, { type: COMMENT_SUCCESS, comment: { id: 'abc' } })).toEqual({
      loading: false,
      error: false,
      success: true,
      comments: [{ id: 'abc' }],
    });
  });

  it('should handle COMMENT_ERROR action', () => {
    expect(reducer({}, { type: COMMENT_ERROR })).toEqual({
      loading: false,
      error: true,
      success: false,
    });
  });

  it('should handle COMMENT_VOTE_SUCCESS action', () => {
    expect(
      reducer(
        { comments: [{ id: 'cde', voteScore: 9 }, { id: 'abc', voteScore: 9 }] },
        { type: COMMENT_VOTE_SUCCESS, comment: { id: 'abc' }, voteScore: 10 }
      )
    ).toEqual({
      comments: [{ id: 'cde', voteScore: 9 }, { id: 'abc', voteScore: 10 }],
    });
  });

  it('should handle COMMENT_CLEAN action', () => {
    expect(reducer({}, { type: COMMENT_CLEAN })).toEqual({
      comments: [],
    });
  });

  it('should handle COMMENT_EDIT_SUCCESS action', () => {
    expect(
      reducer(
        { comments: [{ id: 'cde', description: 'description' }, { id: 'abc', description: 'description' }] },
        { type: COMMENT_EDIT_SUCCESS, comment: { id: 'abc', description: 'another one' } }
      )
    ).toEqual({
      comments: [{ id: 'cde', description: 'description' }, { id: 'abc', description: 'another one' }],
    });
  });

  it('should handle COMMENT_DELETE_SUCCESS action', () => {
    expect(reducer({ comments: [{ id: 'abc' }, { id: 'cde' }] }, { type: COMMENT_DELETE_SUCCESS, comment: { id: 'abc' } })).toEqual({
      comments: [{ id: 'cde' }],
    });
  });
});
