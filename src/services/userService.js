import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class UserService {

  getUser = (userid) => {
    return apiService.makeRequest('get', `http://localhost:4000/users/${userid}`, 'usr-g');
  }

  getUsers = () => {
    return apiService.makeRequest('get', `http://localhost:4000/users/`, 'usr-gs');
  }

  updateUser = (user) => {
    return apiService.makeRequest('patch', `http://localhost:4000/users/${user._id}`, 'usr-u', user);
  }

  createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return apiService.makeRequest('post', `http://localhost:4000/users/`, 'usr-c', newUser);
  }

  deleteUser = (userid) => {
    return apiService.makeRequest('delete', `http://localhost:4000/users/${userid}`, 'usr-d');
  }

}

const userService = new UserService();

export default userService;
