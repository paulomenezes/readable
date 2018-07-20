import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import user from './reducers/user';
import userCheck from './reducers/userCheck';
import categories from './reducers/categories';
import posts from './reducers/posts';
import subscription from './reducers/subscription';
import comments from './reducers/comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ui,
    user,
    userCheck,
    categories,
    posts,
    subscription,
    comments,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
