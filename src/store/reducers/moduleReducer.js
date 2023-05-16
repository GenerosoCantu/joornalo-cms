/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  GET_MODULES
} from 'src/store/actions/moduleActions';

const initialState = {
  modules: [],
  module: null
};

const moduleReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_MODULES: {
      const { modules } = action.payload;

      return produce(state, (draft) => {
        draft.modules = modules;
      });
    }

    default: {
      return state;
    }
  }
};

export default moduleReducer;
