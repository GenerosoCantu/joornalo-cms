/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_REQUEST
} from 'src/store/actions/userActions';

const initialState = {
  users: [],
  user: null
};

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_USERS: {
      const { users } = action.payload;

      return produce(state, (draft) => {
        draft.users = users;
      });
    }

    case GET_USER_REQUEST: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case GET_USER: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case UPDATE_USER: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
