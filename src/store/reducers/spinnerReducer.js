/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  SPINNER_ON,
  SPINNER_OFF
} from 'src/store/actions/spinnerActions';

const initialState = {
  spinner: false
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPINNER_ON: {
      return produce(state, (draft) => {
        draft.spinner = true;
      });
    }
    case SPINNER_OFF: {
      return produce(state, (draft) => {
        draft.spinner = false;
      });
    }

    default: {
      return state;
    }
  }
};

export default spinnerReducer;
