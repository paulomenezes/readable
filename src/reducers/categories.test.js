import { CATEGORY_LOADING, CATEGORY_SUCCESS, CATEGORY_ERROR, CATEGORY_LOAD } from '../actions/categories';

import reducer from './categories';

describe('Categories reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: false,
      success: false,
      categories: [],
    });
  });

  it('should handle CATEGORY_LOADING action', () => {
    expect(reducer({}, { type: CATEGORY_LOADING, loading: true })).toEqual({
      loading: true,
    });
  });

  it('should handle CATEGORY_LOAD action', () => {
    expect(reducer({}, { type: CATEGORY_LOAD, categories: [{ id: 'abc' }] })).toEqual({
      loading: false,
      error: false,
      success: true,
      categories: [{ id: 'abc' }],
    });
  });

  it('should handle CATEGORY_SUCCESS action', () => {
    expect(reducer({ categories: [] }, { type: CATEGORY_SUCCESS, category: { id: 'abc' } })).toEqual({
      loading: false,
      error: false,
      success: true,
      categories: [{ id: 'abc' }],
    });
  });

  it('should handle CATEGORY_ERROR action', () => {
    expect(reducer({}, { type: CATEGORY_ERROR })).toEqual({
      loading: false,
      error: true,
      success: false,
    });
  });
});
