import coverService from 'src/services/coverService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_COVERS = '@cover/get-covers';
export const GET_COVER = '@cover/get-cover';
export const CREATE_COVER = '@cover/create-cover';
export const UPDATE_COVER = '@cover/update-cover';
export const DELETE_COVER = '@cover/delete-cover';
export const GET_COVER_REQUEST = '@cover/get-cover-request';
// export const SET_COVER_ERROR = '@error/set-error';
// export const CLEAR_COVER_ERROR = '@error/set-error';

export function getCovers() {
  console.log("++++++++++++++++++++++++++++++++++++++++++++++2");
  return async (dispatch) => {
    try {
      const covers = await coverService.getCovers();
      console.log(covers);
      dispatch({
        type: GET_COVERS,
        payload: {
          covers
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

// export function getCovers(force = false) {
//   return async (dispatch, getState) => {
//     const state = getState()

//     if (!force && state.cover?.covers?.length > 0) {
//       return;
//     }

//     try {
//       const covers = await coverService.getCovers();
//       dispatch({
//         type: GET_COVERS,
//         payload: {
//           covers
//         }
//       });
//       dispatch(clearError());
//     } catch (error) {
//       dispatch(setError(error));
//       throw error;
//     }
//   };
// }

export function getCover(coverid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COVER_REQUEST });
      const cover = await coverService.getCover(coverid);
      dispatch({
        type: GET_COVER,
        payload: {
          cover
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}


// export function createCover() {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_COVER_REQUEST });
//       const user = {
//         _id: null,
//         name: '',
//         email: '',
//         desc: '',
//         status: 'Pending',
//         oder: 0,
//         config: {
//           front_headlines: true,
//           headline_mode: 'news_flow',
//           split_paragraphs: true,
//           photo_default_size: "default",
//           remainder_subcover: true,
//           subcover_topic: true,
//           summary_max_characters: 300
//         },
//         subcovers: [],
//         covers: []
//       }
//       dispatch({
//         type: GET_COVER,
//         payload: {
//           user
//         }
//       });
//       dispatch(clearError());
//     } catch (error) {
//       dispatch(setError(error));
//       throw error;
//     }
//   };
// }

export function updateCover(cover) {
  return async (dispatch) => {
    try {
      const request = await coverService.updateCover(cover);

      dispatch({
        type: UPDATE_COVER,
        payload: {
          cover: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteCover(coverid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COVER_REQUEST });
      const cover = await coverService.deleteCover(coverid);
      dispatch({
        type: DELETE_COVER,
        payload: {
          cover
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
