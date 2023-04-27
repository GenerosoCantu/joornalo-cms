import storyService from 'src/services/storyService';
import uploadService from 'src/services/uploadService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_STORIES = '@story/get-stories';
export const GET_STORY = '@story/get-story';
export const CREATE_STORY = '@story/create-story';
export const UPDATE_STORY = '@story/update-story';
export const DELETE_STORY = '@story/delete-story';
export const GET_STORY_REQUEST = '@story/get-story-request';
export const UPLOAD_IMAGE = '@story/upload-image';
export const UPLOAD_IMAGE_REQUEST = '@story/upload-image-request';
export const DELETE_IMAGE_REQUEST = '@story/delete-image-request';
export const DELETE_IMAGE = '@story/delete-image';
// export const SET_STORY_ERROR = '@error/set-error';
// export const CLEAR_STORY_ERROR = '@error/set-error';

export function getStories(storyQuery) {
  // export function getStories(force = false) {
  return async (dispatch, getState) => {
    const state = getState()

    // if (!force && state.story?.story?.length > 0) {
    //   return;
    // }

    try {
      const { metadata, data } = await storyService.getStories(storyQuery);
      dispatch({
        type: GET_STORIES,
        payload: {
          stories: data,
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

export function getStory(storyId) {
  return async (dispatch) => {
    try {
      console.log(storyId)
      dispatch({ type: GET_STORY_REQUEST });
      const story = await storyService.getStory(storyId);
      dispatch({
        type: GET_STORY,
        payload: {
          story
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function newStory() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_STORY_REQUEST });
      const story = {
        _id: null,
        name: '',
        email: '',
        desc: '',
        status: 'Inactive',
        // oder: 0,
        // config: {
        //   front_headlines: true,
        //   headline_mode: 'story_flow',
        //   split_paragraphs: true,
        //   photo_default_size: "default",
        //   remainder_subnew: true,
        //   subnew_topic: true,
        //   summary_max_characters: 300
        // },
        // substory: [],
        // covers: []
      }
      dispatch({
        type: GET_STORY,
        payload: {
          story
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function updateStory(story) {
  return async (dispatch) => {
    try {
      const request = await storyService.updateStory(story);

      dispatch({
        type: UPDATE_STORY,
        payload: {
          story: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function createStory(story) {
  return async (dispatch) => {
    try {
      const request = await storyService.createStory(story);
      dispatch({
        type: CREATE_STORY,
        payload: {
          story: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteStory(storyId) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_STORY_REQUEST });
      const story = await storyService.deleteStory(storyId);
      dispatch({
        type: DELETE_STORY,
        payload: {
          story
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function uploadImage(file) {
  return async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_REQUEST });
      const image = await uploadService.uploadImage(file);
      dispatch({
        type: UPLOAD_IMAGE,
        payload: {
          file
        }
      });
      dispatch(clearError());
      return image
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteFile(file) {
  return async (dispatch) => {
    console.log('deleteFile:', file)
    try {
      dispatch({ type: DELETE_IMAGE_REQUEST });
      const resp = await uploadService.deleteImage(file);
      dispatch({
        type: DELETE_IMAGE,
        payload: {
          file
        }
      });
      dispatch(clearError());
      return resp
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
