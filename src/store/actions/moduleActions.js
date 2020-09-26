import moduleService from 'src/services/moduleService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_MODULES = '@section/get-modules';
// export const SET_ERROR = '@error/set-error';
// export const CLEAR_ERROR = '@error/set-error';

export function getModules() {

  return async (dispatch, getState) => {
    const state = getState()

    if (state.module?.modules?.length > 0) {
      return;
    }

    try {
      const modules = await moduleService.getModules();
      dispatch({
        type: GET_MODULES,
        payload: {
          modules
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
