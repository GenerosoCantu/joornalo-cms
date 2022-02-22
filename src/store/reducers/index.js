import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';

import errorReducer from './errorReducer';
import userReducer from './userReducer';
import sectionReducer from './sectionReducer';
import storyReducer from './storyReducer';
import moduleReducer from './moduleReducer';
import coverReducer from './coverReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  form: formReducer,
  error: errorReducer,
  user: userReducer,
  section: sectionReducer,
  story: storyReducer,
  module: moduleReducer,
  cover: coverReducer

});

export default rootReducer;
