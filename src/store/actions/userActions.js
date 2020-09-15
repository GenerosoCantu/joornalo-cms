import axios from 'src/utils/axios';
import userService from 'src/services/userService';

export const GET_USERS = '@user/get-users';
export const GET_USER = '@user/get-user';
export const CREATE_USER = '@user/create-user';
export const UPDATE_USER = '@user/update-user';
export const DELETE_USER = '@user/delete-user';
export const GET_USER_REQUEST = '@user/get-user-request';

export function getUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch({
        type: GET_USERS,
        payload: {
          users
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getUser(userid) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
      const user = await userService.getUser(userid);
      dispatch({
        type: GET_USER,
        payload: {
          user
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function updateUser(user) {
  return async (dispatch) => {
    try {
      const request = await userService.updateUser(user);

      dispatch({
        type: UPDATE_USER,
        payload: {
          user: request
        }
      });

    } catch (error) {
      throw error;
    }
  };
}
