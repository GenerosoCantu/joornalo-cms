import apiService from 'src/services/apiService';

class TenantService {

  getTenant = (tenantid) => {
    return apiService.makeRequest('get', null, `${process.env.REACT_APP_JOORNALO_TENANT_API_URL}tenants/${tenantid}`, 'tnnt-g');
  }

}

const tenantService = new TenantService();

export default tenantService;
