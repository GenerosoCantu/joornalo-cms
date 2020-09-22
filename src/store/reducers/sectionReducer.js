/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_SECTIONS,
  GET_SECTION,
  CREATE_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  GET_SECTION_REQUEST
} from 'src/store/actions/sectionActions';

const initialState = {
  sections: [],
  section: null
};

const sectionReducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case GET_SECTIONS: {
      const { sections } = action.payload;

      return produce(state, (draft) => {
        draft.sections = sections;
      });
    }

    case GET_SECTION_REQUEST: {
      return produce(state, (draft) => {
        draft.section = null;
      });
    }

    case GET_SECTION: {
      const { section } = action.payload;

      return produce(state, (draft) => {
        draft.section = section;
      });
    }

    case UPDATE_SECTION: {
      const { section } = action.payload;

      return produce(state, (draft) => {
        draft.section = section;
      });
    }

    default: {
      return state;
    }
  }
};

export default sectionReducer;
