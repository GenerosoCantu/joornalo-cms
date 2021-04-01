import sectionService from 'src/services/sectionService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_SECTIONS = '@section/get-sections';
export const GET_SECTION = '@section/get-section';
export const CREATE_SECTION = '@section/create-section';
export const UPDATE_SECTION = '@section/update-section';
export const DELETE_SECTION = '@section/delete-section';
export const GET_SECTION_REQUEST = '@section/get-section-request';
// export const SET_SECTION_ERROR = '@error/set-error';
// export const CLEAR_SECTION_ERROR = '@error/set-error';

export function getSections(force = false) {
  return async (dispatch, getState) => {
    const state = getState()

    if (!force && state.section?.sections?.length > 0) {
      return;
    }

    try {
      const sections = await sectionService.getSections();
      dispatch({
        type: GET_SECTIONS,
        payload: {
          sections
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function getSection(sectionid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SECTION_REQUEST });
      const section = await sectionService.getSection(sectionid);
      dispatch({
        type: GET_SECTION,
        payload: {
          section
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}


export function createSection() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SECTION_REQUEST });
      const user = {
        _id: null,
        name: '',
        email: '',
        desc: '',
        status: 'Pending',
        oder: 0,
        config: {
          front_headlines: true,
          headline_mode: 'news_flow',
          split_paragraphs: true,
          photo_default_size: "default",
          remainder_subsection: true,
          subsection_topic: true,
          summary_max_characters: 300
        },
        subsections: [],
        covers: []
      }
      dispatch({
        type: GET_SECTION,
        payload: {
          user
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function updateSection(section) {
  return async (dispatch) => {
    try {
      const request = await sectionService.updateSection(section);

      dispatch({
        type: UPDATE_SECTION,
        payload: {
          section: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteSection(sectionid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SECTION_REQUEST });
      const section = await sectionService.deleteSection(sectionid);
      dispatch({
        type: DELETE_SECTION,
        payload: {
          section
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
