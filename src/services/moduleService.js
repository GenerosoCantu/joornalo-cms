import apiService from 'src/services/apiService';

class ModuleService {

  getModules = () => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}modules/`, 'mdl-gs');
  }

}

const moduleService = new ModuleService();

export default moduleService;
