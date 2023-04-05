/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_FRONTS,
  GET_FRONT,
  CREATE_FRONT,
  UPDATE_FRONT,
  DELETE_FRONT,
  GET_FRONT_REQUEST
} from 'src/store/actions/frontActions';

const initialState = {
  fronts: [],
  metadata: {},
  front: null
};

const frontReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_FRONTS: {
      const { fronts, metadata } = action.payload;

      return produce(state, (draft) => {
        draft.fronts = fronts;
        draft.metadata = metadata;
      });
    }

    case GET_FRONT_REQUEST: {
      return produce(state, (draft) => {
        draft.front = null;
      });
    }

    case GET_FRONT: {
      const { front } = action.payload;

      return produce(state, (draft) => {
        draft.front = front;
      });
    }

    case UPDATE_FRONT: {
      const { front } = action.payload;

      return produce(state, (draft) => {
        draft.front = front;
      });
    }

    default: {
      return state;
    }
  }
};

export default frontReducer;
