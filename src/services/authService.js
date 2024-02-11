import { jwtDecode } from "jwt-decode";
import apiService from 'src/services/apiService';
import axios from 'src/utils/axios';
import { tenantUrls } from 'src/constants'

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  loginWithEmailAndPassword = async (email, password) => {
    const response = await apiService.makeRequest('post', tenantUrls.cmsapi, `auth/login`, 'aut-p', { username: email, password });
    if (response.user) {
      this.setSession(response.accessToken);
      console.log('Login response', response.user);
      return response.user;
    }
  }

  loginInWithToken = async (currentTenant) => {
    const savedTenant = sessionStorage.getItem("tenant");
    if (currentTenant !== savedTenant) {
      this.logout();
    }
    const user = await apiService.makeRequest('get', tenantUrls.cmsapi, `users/profile`, 'aut-g');
    return user;
  }

  logout = () => {
    this.setSession(null);
  }

  setSession = (accessToken) => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem('tenant');
      sessionStorage.removeItem('tenantUrls');
      sessionStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  getAccessToken = () => sessionStorage.getItem('accessToken');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;
