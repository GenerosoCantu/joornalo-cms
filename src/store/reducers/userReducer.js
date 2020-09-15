/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_REQUEST
} from 'src/store/actions/userActions';
// import objFromArray from 'src/utils/objFromArray';

const initialState = {
  users: [],
  user: null
};

const userReducer = (state = initialState, action) => {
  console.log(action);

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

      console.log(user);

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
