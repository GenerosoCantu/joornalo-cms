import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';
import { tenantUrls } from 'src/constants'

class UserService {

  getUser = (userid) => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `users/${userid}`, 'usr-g');
  }

  getUsers = () => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `users/`, 'usr-gs');
  }

  updateUser = (user) => {
    return apiService.makeRequest('patch', tenantUrls.cmsapi, `users/${user._id}`, 'usr-u', user);
  }

  createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return apiService.makeRequest('post', tenantUrls.cmsapi, `users/`, 'usr-c', newUser);
  }

  deleteUser = (userid) => {
    return apiService.makeRequest('delete', tenantUrls.cmsapi, `users/${userid}`, 'usr-d');
  }

}

const userService = new UserService();

export default userService;
