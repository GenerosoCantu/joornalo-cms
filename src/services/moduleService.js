import apiService from 'src/services/apiService';

class ModuleService {

  getModules = () => {
    return apiService.makeRequest('get', `http://localhost:4000/modules/`, 'mdl-gs');
  }

}

const moduleService = new ModuleService();

export default moduleService;
