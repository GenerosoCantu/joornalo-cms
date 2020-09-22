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

export function getSections() {
  return async (dispatch) => {
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
