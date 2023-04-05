import frontService from 'src/services/frontService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_FRONTS = '@front/get-fronts';
export const GET_FRONT = '@front/get-front';
export const CREATE_FRONT = '@front/create-front';
export const UPDATE_FRONT = '@front/update-front';
export const DELETE_FRONT = '@front/delete-front';
export const GET_FRONT_REQUEST = '@front/get-front-request';
// export const SET_FRONT_ERROR = '@error/set-error';
// export const CLEAR_FRONT_ERROR = '@error/set-error';

export function getFronts(frontQuery) {
  // export function getFronts(force = false) {
  return async (dispatch, getState) => {
    const state = getState()

    // if (!force && state.front?.front?.length > 0) {
    //   return;
    // }

    try {
      const { metadata, data } = await frontService.getFronts(frontQuery);
      dispatch({
        type: GET_FRONTS,
        payload: {
          fronts: data,
          metadata
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function getFront(frontId) {
  return async (dispatch) => {
    try {
      console.log(frontId)
      dispatch({ type: GET_FRONT_REQUEST });
      const front = await frontService.getFront(frontId);
      dispatch({
        type: GET_FRONT,
        payload: {
          front
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}


export function newFront() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_FRONT_REQUEST });
      const front = {
        _id: null,
        name: '',
        email: '',
        desc: '',
        status: 'Inactive',
        // oder: 0,
        // config: {
        //   front_headlines: true,
        //   headline_mode: 'front_flow',
        //   split_paragraphs: true,
        //   photo_default_size: "default",
        //   remainder_subnew: true,
        //   subnew_topic: true,
        //   summary_max_characters: 300
        // },
        // subfront: [],
        // covers: []
      }
      dispatch({
        type: GET_FRONT,
        payload: {
          front
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function updateFront(front) {
  return async (dispatch) => {
    try {
      const request = await frontService.updateFront(front);

      dispatch({
        type: UPDATE_FRONT,
        payload: {
          front: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function createFront(front) {
  return async (dispatch) => {
    try {
      const request = await frontService.createFront(front);
      dispatch({
        type: CREATE_FRONT,
        payload: {
          front: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteFront(frontId) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_FRONT_REQUEST });
      const front = await frontService.deleteFront(frontId);
      dispatch({
        type: DELETE_FRONT,
        payload: {
          front
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
