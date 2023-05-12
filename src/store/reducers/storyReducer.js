/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_STORIES,
  GET_STORY,
  CREATE_STORY,
  UPDATE_STORY,
  DELETE_STORY,
  GET_STORY_REQUEST,
  SET_STORY_QUERY
} from 'src/store/actions/storyActions';

const initialState = {
  stories: [],
  metadata: {},
  story: null,
  storyQuery: null
};

const storyReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_STORIES: {
      const { stories, metadata } = action.payload;

      return produce(state, (draft) => {
        draft.stories = stories;
        draft.metadata = metadata;
      });
    }

    case GET_STORY_REQUEST: {
      return produce(state, (draft) => {
        draft.story = null;
      });
    }

    case GET_STORY: {
      const { story } = action.payload;

      return produce(state, (draft) => {
        draft.story = story;
      });
    }

    case UPDATE_STORY: {
      const { story } = action.payload;

      return produce(state, (draft) => {
        draft.story = story;
      });
    }

    case SET_STORY_QUERY: {
      const { storyQuery } = action.payload;

      return produce(state, (draft) => {
        draft.storyQuery = storyQuery;
      });
    }

    default: {
      return state;
    }
  }
};

export default storyReducer;
