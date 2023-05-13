import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class UserService {

  getUser = (userid) => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}users/${userid}`, 'usr-g');
  }

  getUsers = () => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}users/`, 'usr-gs');
  }

  updateUser = (user) => {
    return apiService.makeRequest('patch', `${process.env.REACT_APP_JOORNALO_API_URL}users/${user._id}`, 'usr-u', user);
  }

  createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_API_URL}users/`, 'usr-c', newUser);
  }

  deleteUser = (userid) => {
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_API_URL}users/${userid}`, 'usr-d');
  }

}

const userService = new UserService();

export default userService;
