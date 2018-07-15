import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import user from './reducers/user';
import userCheck from './reducers/userCheck';
import categories from './reducers/categories';
import posts from './reducers/posts';
import subscription from './reducers/subscription';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ui,
    user,
    userCheck,
    categories,
    posts,
    subscription,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
