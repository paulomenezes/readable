import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetch from '../__test-helpers__/fetch';

import {
  COMMENT_LOADING,
  COMMENT_LOAD,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  COMMENT_VOTE_SUCCESS,
  COMMENT_CLEAN,
  COMMENT_DELETE_SUCCESS,
  COMMENT_EDIT_SUCCESS,
  isLoading,
  commentLoad,
  commentSuccess,
  commentError,
  commentVoteSuccess,
  commentClean,
  commentDeleteSuccess,
  commentEditSuccess,
  getByPost,
  insertComment,
  vote,
  removeComment,
  cleanComments,
} from './comments';
import { POST_INCREMENT_COMMENT } from './posts';
import { CONFIRM_MODAL } from './ui';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  loading: false,
  error: false,
  success: false,
  comments: undefined,
});

describe('Comments action creators', () => {
  it('isLoading should dispatch COMMENT_LOADING action', () => {
    expect(isLoading(true)).toEqual({
      type: COMMENT_LOADING,
      loading: true,
    });
  });

  it('commentLoad should dispatch COMMENT_LOAD action', () => {
    expect(commentLoad([])).toEqual({
      type: COMMENT_LOAD,
      comments: [],
    });
  });

  it('commentSuccess should dispatch COMMENT_SUCCESS action', () => {
    expect(commentSuccess({})).toEqual({
      type: COMMENT_SUCCESS,
      comment: {},
    });
  });

  it('commentError should dispatch COMMENT_ERROR action', () => {
    expect(commentError()).toEqual({
      type: COMMENT_ERROR,
    });
  });

  it('commentVoteSuccess should dispatch COMMENT_VOTE_SUCCESS action', () => {
    expect(commentVoteSuccess({}, 1)).toEqual({
      type: COMMENT_VOTE_SUCCESS,
      comment: {},
      voteScore: 1,
    });
  });
  it('commentClean should dispatch COMMENT_CLEAN action', () => {
    expect(commentClean()).toEqual({
      type: COMMENT_CLEAN,
    });
  });

  it('commentDeleteSuccess should dispatch COMMENT_DELETE_SUCCESS action', () => {
    expect(commentDeleteSuccess({})).toEqual({
      type: COMMENT_DELETE_SUCCESS,
      comment: {},
    });
  });

  it('commentEditSuccess should dispatch COMMENT_EDIT_SUCCESS action', () => {
    expect(commentEditSuccess({})).toEqual({
      type: COMMENT_EDIT_SUCCESS,
      comment: {},
    });
  });

  afterEach(() => store.clearActions());

  it('dispatch getByPost calls isLoading and commentLoad actions', async () => {
    window.fetch = fetch.successful({ a1: { id: '123' }, a2: { id: '123', deleted: true } });

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
      {
        type: COMMENT_LOAD,
        comments: [{ id: '123' }],
      },
    ];

    await store.dispatch(getByPost('react'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch getByPost calls isLoading and commentLoad actions with no comments', async () => {
    window.fetch = fetch.successful(undefined);

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
      {
        type: COMMENT_ERROR,
      },
    ];

    await store.dispatch(getByPost('react'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertComment calls isLoading, commentSuccess and postIncrementComment actions', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
      {
        type: COMMENT_SUCCESS,
        comment: {},
      },
      {
        type: POST_INCREMENT_COMMENT,
        post: {
          id: '123',
          commentCount: 1,
        },
        newCounter: 2,
      },
    ];

    await store.dispatch(
      insertComment(
        {
          id: '123',
          commentCount: 1,
        },
        {
          username: 'paulo',
        },
        'description'
      )
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[2]).toEqual(expectedActions[2]);
  });

  it('dispatch insertComment calls isLoading, commentSuccess and postIncrementComment actions with a comment to edit', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
      {
        type: COMMENT_EDIT_SUCCESS,
        comment: {},
      },
    ];

    await store.dispatch(
      insertComment(
        {
          id: '123',
          commentCount: 1,
        },
        {
          username: 'paulo',
        },
        'description',
        {
          id: '123',
          voteScore: 10,
        }
      )
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    expect(actions[1].type).toEqual(expectedActions[1].type);
  });

  it('dispatch insertComment without params', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
    ];

    await store.dispatch(insertComment());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch insertComment with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: COMMENT_LOADING,
        loading: true,
      },
      {
        type: COMMENT_ERROR,
      },
    ];

    await store.dispatch(insertComment({}, {}, 'teste'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls commentVoteSuccess action with up type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_VOTE_SUCCESS,
        comment: { id: '123', voteScore: 2 },
        voteScore: 3,
      },
    ];

    await store.dispatch(vote({ id: '123', voteScore: 2 }, 'up'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls commentVoteSuccess action with down type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_VOTE_SUCCESS,
        comment: { id: '123', voteScore: 2 },
        voteScore: 1,
      },
    ];

    await store.dispatch(vote({ id: '123', voteScore: 2 }, 'down'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch vote calls commentVoteSuccess action with invalid type', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_VOTE_SUCCESS,
        comment: { id: '123', voteScore: 2 },
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
        type: COMMENT_ERROR,
      },
    ];

    await store.dispatch(vote({}, 'up'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  //

  it('dispatch removeComment calls commentDeleteSuccess and confirmModal actions', async () => {
    window.fetch = fetch.successful();

    const expectedActions = [
      {
        type: COMMENT_DELETE_SUCCESS,
        comment: { id: '123' },
      },
      {
        type: CONFIRM_MODAL,
        opened: false,
        title: undefined,
        item: undefined,
        post: undefined,
      },
      {
        type: POST_INCREMENT_COMMENT,
        post: {
          id: '123',
          commentCount: 1,
        },
        newCounter: 0,
      },
    ];

    await store.dispatch(removeComment({ id: '123' }, { id: '123', commentCount: 1 }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch removeComment without post nothing happens', async () => {
    const expectedActions = [];

    await store.dispatch(removeComment());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch removeComment calls commentDeleteSuccess actions with failing request', async () => {
    window.fetch = fetch.failing();

    const expectedActions = [
      {
        type: COMMENT_ERROR,
      },
    ];

    await store.dispatch(removeComment('ops'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatch cleanComments calls commentClean action', async () => {
    const expectedActions = [
      {
        type: COMMENT_CLEAN,
      },
    ];

    await store.dispatch(cleanComments());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
