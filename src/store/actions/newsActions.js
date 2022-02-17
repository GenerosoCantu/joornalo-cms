import newsService from 'src/services/newsService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_NEWS = '@news/get-news';
export const GET_NEW = '@news/get-new';
export const CREATE_NEWS = '@news/create-new';
export const UPDATE_NEWS = '@news/update-new';
export const DELETE_NEWS = '@news/delete-new';
export const GET_NEWS_REQUEST = '@news/get-new-request';
// export const SET_NEW_ERROR = '@error/set-error';
// export const CLEAR_NEW_ERROR = '@error/set-error';

export function getNews(newsQuery) {
  // export function getNews(force = false) {
  return async (dispatch, getState) => {
    const state = getState()

    // if (!force && state.new?.news?.length > 0) {
    //   return;
    // }

    try {
      const { metadata, data } = await newsService.getNews(newsQuery);
      dispatch({
        type: GET_NEWS,
        payload: {
          news: data,
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

export function getNew(newid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_NEWS_REQUEST });
      const news = await newsService.getNew(newid);
      dispatch({
        type: GET_NEW,
        payload: {
          news
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}


export function newNews() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_NEWS_REQUEST });
      const news = {
        _id: null,
        name: '',
        email: '',
        desc: '',
        status: 'Inactive',
        oder: 0,
        config: {
          front_headlines: true,
          headline_mode: 'news_flow',
          split_paragraphs: true,
          photo_default_size: "default",
          remainder_subnew: true,
          subnew_topic: true,
          summary_max_characters: 300
        },
        subnews: [],
        covers: []
      }
      dispatch({
        type: GET_NEW,
        payload: {
          news
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function updateNews(news) {
  return async (dispatch) => {
    try {
      const request = await newsService.updateNew(news);

      dispatch({
        type: UPDATE_NEWS,
        payload: {
          new: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function createNews(news) {
  return async (dispatch) => {
    try {
      const request = await newsService.createNew(news);
      dispatch({
        type: CREATE_NEWS,
        payload: {
          new: request
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}

export function deleteNews(newid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_NEWS_REQUEST });
      const news = await newsService.deleteNew(newid);
      dispatch({
        type: DELETE_NEWS,
        payload: {
          news
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
