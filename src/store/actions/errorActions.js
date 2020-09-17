export const CLEAR_ERROR = '@error/clear-error';
export const SET_ERROR = '@error/set-error';


export function setError(error) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_ERROR,
        payload: {
          error
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function clearError(user) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CLEAR_ERROR,
        payload: {
          user: null
        }
      });

    } catch (error) {
      throw error;
    }
  };
}
