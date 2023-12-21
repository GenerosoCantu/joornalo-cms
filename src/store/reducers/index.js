import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';

import errorReducer from './errorReducer';
import userReducer from './userReducer';
import sectionReducer from './sectionReducer';
import storyReducer from './storyReducer';
import frontReducer from './frontReducer';
import moduleReducer from './moduleReducer';
import coverReducer from './coverReducer';
import tenantReducer from './tenantReducer';
import spinnerReducer from './spinnerReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  form: formReducer,
  error: errorReducer,
  user: userReducer,
  section: sectionReducer,
  story: storyReducer,
  front: frontReducer,
  tenant: tenantReducer,
  module: moduleReducer,
  cover: coverReducer,
  spinner: spinnerReducer
});

export default rootReducer;
