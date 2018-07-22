import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';

import {
  CATEGORY_LOADING,
  CATEGORY_LOAD,
  CATEGORY_SUCCESS,
  CATEGORY_ERROR,
  isLoading,
  categoryLoad,
  categorySuccess,
  categoryError,
  loadCategories,
  insertCategory,
} from './categories';
import { ADD_CATEGORY_MODAL } from './ui';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  error: false,
  success: false,
  categories: undefined,
});

describe('Categories action creators', () => {
  it('isLoading should dispatch CATEGORY_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: CATEGORY_LOADING,
      loading: true,
    });
  });

  it('categoryLoad should dispatch CATEGORY_LOAD action', () => {
    expect(categoryLoad([])).toEqual({
      type: CATEGORY_LOAD,
      categories: [],
    });
  });

  it('categorySuccess should dispatch CATEGORY_SUCCESS action', () => {
    expect(categorySuccess({})).toEqual({
      type: CATEGORY_SUCCESS,
      category: {},
    });
  });

  it('categoryError should dispatch CATEGORY_ERROR action', () => {
    expect(categoryError()).toEqual({
      type: CATEGORY_ERROR,
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch loadCategories calls isLoading and categoryLoad actions', async () => {
    window.fetch = fetch.successful({ react: { name: 'react' }, redux: { name: 'redux' } });

    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
      {
        type: CATEGORY_LOAD,
        categories: [{ name: 'react' }, { name: 'redux' }],
      },
    ];

    await store.dispatch(loadCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch loadCategories dispatch isLoading and categoryLoad with no categories', async () => {
    window.fetch = fetch.successful(undefined);

    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
      {
        type: CATEGORY_LOAD,
        categories: undefined,
      },
    ];

    await store.dispatch(loadCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch loadCategories with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
      {
        type: CATEGORY_ERROR,
      },
    ];

    await store.dispatch(loadCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertCategory calls isLoading, categorySuccess and addCategoryModal actions', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
      {
        type: CATEGORY_SUCCESS,
        category: { name: 'react', link: 'react', description: 'description' },
      },
      {
        type: ADD_CATEGORY_MODAL,
        opened: false,
      },
    ];

    await store.dispatch(insertCategory({ name: 'react', link: 'react', description: 'description' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertCategory without params', async () => {
    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
    ];

    await store.dispatch(insertCategory({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertCategory with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: CATEGORY_LOADING,
        loading: true,
      },
      {
        type: CATEGORY_ERROR,
      },
    ];

    await store.dispatch(insertCategory({ name: 'react', link: 'react', description: 'description' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
