/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_NEWS,
  GET_NEW,
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  GET_NEWS_REQUEST
} from 'src/store/actions/newsActions';

const initialState = {
  news: [],
  metadata: {},
  new: null
};

const newsReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_NEWS: {
      const { news, metadata } = action.payload;

      return produce(state, (draft) => {
        draft.news = news;
        draft.metadata = metadata;
      });
    }

    case GET_NEWS_REQUEST: {
      return produce(state, (draft) => {
        draft.new = null;
      });
    }

    case GET_NEW: {
      const { news } = action.payload;

      return produce(state, (draft) => {
        draft.new = news;
      });
    }

    case UPDATE_NEWS: {
      const { news } = action.payload;

      return produce(state, (draft) => {
        draft.new = news;
      });
    }

    default: {
      return state;
    }
  }
};

export default newsReducer;
