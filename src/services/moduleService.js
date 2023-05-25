import apiService from 'src/services/apiService';
import { tenantUrls } from 'src/constants'

class ModuleService {

  getModules = () => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `modules/`, 'mdl-gs');
  }

}

const moduleService = new ModuleService();

export default moduleService;
