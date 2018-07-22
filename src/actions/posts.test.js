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
  POST_INCREMENT_COMMENT,
  isLoading,
  postLoad,
  postSuccess,
  postEditSuccess,
  postError,
  postVoteSuccess,
  postDeleteSuccess,
  postIncrementComment,
  getAll,
  getByCategory,
  getById,
  insertPost,
  vote,
  removePost,
} from './posts';
import { CONFIRM_MODAL, ADD_POST_MODAL } from './ui';

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

  it('postIncrementComment should dispatch POST_INCREMENT_COMMENT action', () => {
    expect(postIncrementComment({}, 1)).toEqual({
      type: POST_INCREMENT_COMMENT,
      post: {},
      newCounter: 1,
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch getAll calls isLoading and postLoad actions', async () => {
    window.fetch = fetch.successful({ react: { a1: { id: '123' }, a2: { id: '123', deleted: true } } });

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_LOAD,
        posts: [{ id: '123' }],
      },
    ];

    await store.dispatch(getAll());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getAll calls isLoading and postLoad actions with no posts', async () => {
    window.fetch = fetch.successful(undefined);

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_LOAD,
        posts: [],
      },
    ];

    await store.dispatch(getAll());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getAll calls isLoading and postLoad actions with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(getAll());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getByCategory calls isLoading and postLoad actions', async () => {
    window.fetch = fetch.successful({ a1: { id: '123' }, a2: { id: '123', deleted: true } });

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_LOAD,
        posts: [{ id: '123' }],
      },
    ];

    await store.dispatch(getByCategory('react'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getByCategory calls isLoading and postLoad actions with no posts', async () => {
    window.fetch = fetch.successful(undefined);

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(getByCategory('ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getByCategory calls isLoading and postLoad actions with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(getByCategory('ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getById calls isLoading and postLoad actions', async () => {
    window.fetch = fetch.successful({ id: '123' });

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_LOAD,
        posts: [{ id: '123' }],
      },
    ];

    await store.dispatch(getById('react'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getById calls isLoading and postLoad actions with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(getById('ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertPost calls isLoading, postSuccess and addPostModal actions', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_SUCCESS,
        post: {
          timestamp: Date.now(),
          author: 'paulo',
          category: 'react',
          voteScore: 1,
          deleted: false,
          name: 'name',
          description: 'description',
          commentCount: 0,
        },
      },
      {
        type: ADD_POST_MODAL,
        opened: false,
      },
    ];

    await store.dispatch(
      insertPost({
        originalPost: null,
        name: 'name',
        description: 'description',
        category: 'react',
        user: {
          username: 'paulo',
        },
      })
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[2]).toEqual(expectedActions[2]);

    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].post.id).toBeDefined();
    expect(actions[1].post.timestamp).toBeDefined();
    expect(actions[1].post.author).toEqual(expectedActions[1].post.author);
    expect(actions[1].post.category).toEqual(expectedActions[1].post.category);
    expect(actions[1].post.voteScore).toEqual(expectedActions[1].post.voteScore);
    expect(actions[1].post.deleted).toEqual(expectedActions[1].post.deleted);
    expect(actions[1].post.name).toEqual(expectedActions[1].post.name);
    expect(actions[1].post.description).toEqual(expectedActions[1].post.description);
    expect(actions[1].post.commentCount).toEqual(expectedActions[1].post.commentCount);
  });

  it('dispatch insertPost calls isLoading, postSuccess and addPostModal actions with post to edit', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_EDIT_SUCCESS,
        post: {
          id: 123,
          timestamp: Date.now(),
          author: 'paulo',
          category: 'react',
          voteScore: 10,
          deleted: false,
          name: 'name',
          description: 'description',
          commentCount: 10,
        },
      },
      {
        type: ADD_POST_MODAL,
        opened: false,
      },
    ];

    await store.dispatch(
      insertPost({
        originalPost: {
          id: 123,
          category: 'react',
          name: 'teste',
          voteScore: 10,
          commentCount: 10,
        },
        name: 'name',
        description: 'description',
        category: 'react',
        user: {
          username: 'paulo',
        },
      })
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[2]).toEqual(expectedActions[2]);

    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].post.timestamp).toBeDefined();
    expect(actions[1].post.id).toEqual(expectedActions[1].post.id);
    expect(actions[1].post.author).toEqual(expectedActions[1].post.author);
    expect(actions[1].post.category).toEqual(expectedActions[1].post.category);
    expect(actions[1].post.voteScore).toEqual(expectedActions[1].post.voteScore);
    expect(actions[1].post.deleted).toEqual(expectedActions[1].post.deleted);
    expect(actions[1].post.name).toEqual(expectedActions[1].post.name);
    expect(actions[1].post.description).toEqual(expectedActions[1].post.description);
    expect(actions[1].post.commentCount).toEqual(expectedActions[1].post.commentCount);
  });

  it('dispatch insertPost calls isLoading, postSuccess and addPostModal actions with post to edit category', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_EDIT_SUCCESS,
        post: {
          id: 123,
          timestamp: Date.now(),
          author: 'paulo',
          category: 'redux',
          voteScore: 10,
          deleted: false,
          name: 'name',
          description: 'description',
          commentCount: 10,
        },
      },
      {
        type: ADD_POST_MODAL,
        opened: false,
      },
    ];

    await store.dispatch(
      insertPost({
        originalPost: {
          id: 123,
          category: 'react',
          name: 'teste',
          voteScore: 10,
          commentCount: 10,
        },
        name: 'name',
        description: 'description',
        category: 'redux',
        user: {
          username: 'paulo',
        },
      })
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[2]).toEqual(expectedActions[2]);

    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].post.timestamp).toBeDefined();
    expect(actions[1].post.id).toEqual(expectedActions[1].post.id);
    expect(actions[1].post.author).toEqual(expectedActions[1].post.author);
    expect(actions[1].post.category).toEqual(expectedActions[1].post.category);
    expect(actions[1].post.voteScore).toEqual(expectedActions[1].post.voteScore);
    expect(actions[1].post.deleted).toEqual(expectedActions[1].post.deleted);
    expect(actions[1].post.name).toEqual(expectedActions[1].post.name);
    expect(actions[1].post.description).toEqual(expectedActions[1].post.description);
    expect(actions[1].post.commentCount).toEqual(expectedActions[1].post.commentCount);
  });

  it('dispatch insertPost with no prams', async () => {
    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
    ];

    await store.dispatch(insertPost({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertPost with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_LOADING,
        loading: true,
      },
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(insertPost({ name: 'teste', description: 'teste', category: 'react' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls postVoteSuccess action with up type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_VOTE_SUCCESS,
        post: { id: '123', voteScore: 2 },
        voteScore: 3,
      },
    ];

    await store.dispatch(vote({ id: '123', voteScore: 2 }, 'up'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls postVoteSuccess action with down type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_VOTE_SUCCESS,
        post: { id: '123', voteScore: 2 },
        voteScore: 1,
      },
    ];

    await store.dispatch(vote({ id: '123', voteScore: 2 }, 'down'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls postVoteSuccess action with invalid type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_VOTE_SUCCESS,
        post: { id: '123', voteScore: 2 },
        voteScore: 2,
      },
    ];

    await store.dispatch(vote({ id: '123', voteScore: 2 }, 'ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote without params nothing happens', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [];

    await store.dispatch(vote());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(vote({}, 'up'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch removePost calls postDeleteSuccess and confirmModal actions', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: POST_DELETE_SUCCESS,
        post: { id: '123' },
      },
      {
        type: CONFIRM_MODAL,
        opened: false,
        title: undefined,
        item: undefined,
        post: undefined,
      },
    ];

    await store.dispatch(removePost({ id: '123' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch removePost without post nothing happens', async () => {
    const expectedActions = [];

    await store.dispatch(removePost());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch removePost calls postDeleteSuccess actions with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: POST_ERROR,
      },
    ];

    await store.dispatch(removePost('ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
