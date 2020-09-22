import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import chatReducer from './chatReducer';
import mailReducer from './mailReducer';
import kanbanReducer from './kanbanReducer';

import errorReducer from './errorReducer';
import userReducer from './userReducer';
import sectionReducer from './sectionReducer';
import moduleReducer from './moduleReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  mail: mailReducer,
  kanban: kanbanReducer,
  form: formReducer,
  error: errorReducer,
  user: userReducer,
  section: sectionReducer,
  module: moduleReducer

});

export default rootReducer;
