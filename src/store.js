import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import user from './reducers/user';
import userCheck from './reducers/userCheck';

const store = createStore(
  combineReducers({
    ui,
    user,
    userCheck
  }),
  applyMiddleware(thunk)
);

export default store;
