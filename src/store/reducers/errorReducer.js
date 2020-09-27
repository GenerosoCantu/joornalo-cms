/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  CLEAR_ERROR,
  SET_ERROR
} from 'src/store/actions/errorActions';

const initialState = {
  error: null
};

const errorReducer = (state = initialState, action) => {
  // console.log('action.type:', action.type);
  // console.log('action.payload:', action.payload);
  switch (action.type) {

    case CLEAR_ERROR: {
      return produce(state, (draft) => {
        draft.error = null;
      });
    }

    case SET_ERROR: {
      const { error } = action.payload;

      return produce(state, (draft) => {
        if (error) {
          draft.error = `Something went wrong! (${error})`;
        }
      });
    }

    default: {
      return state;
    }
  }
};

export default errorReducer;
