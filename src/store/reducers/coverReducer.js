/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  GET_COVERS,
  GET_COVER,
  CREATE_COVER,
  UPDATE_COVER,
  DELETE_COVER,
  GET_COVER_REQUEST
} from 'src/store/actions/coverActions';

const initialState = {
  covers: [],
  cover: null
};

const coverReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_COVERS: {
      const { covers } = action.payload;

      return produce(state, (draft) => {
        draft.covers = covers;
      });
    }

    case GET_COVER_REQUEST: {
      return produce(state, (draft) => {
        draft.cover = null;
      });
    }

    case GET_COVER: {
      const { cover } = action.payload;

      return produce(state, (draft) => {
        draft.cover = cover;
      });
    }

    case UPDATE_COVER: {
      const { cover } = action.payload;

      return produce(state, (draft) => {
        draft.cover = cover;
      });
    }

    default: {
      return state;
    }
  }
};

export default coverReducer;
