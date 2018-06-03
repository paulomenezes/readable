import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import user from './reducers/user';

const store = createStore(
  combineReducers({
    ui,
    user
  }),
  applyMiddleware(thunk)
);

export default store;
