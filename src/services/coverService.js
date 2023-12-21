import apiService from 'src/services/apiService';
import { tenantUrls } from 'src/constants'

class CoverService {

  getCover = (coverid) => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `covers/${coverid}`, 'cvr-g');
  }

  getCovers = () => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `covers/`, 'cvr-gs');
  }

  updateCover = (cover) => {
    return apiService.makeRequest('patch', tenantUrls.cmsapi, `covers/${cover.id}`, 'cvr-u', cover);
  }

  createCover = (cover) => {
    return apiService.makeRequest('post', tenantUrls.cmsapi, `covers/`, 'cvr-c', cover);
  }

  deleteCover = (coverid) => {
    return apiService.makeRequest('delete', tenantUrls.cmsapi, `covers/${coverid}`, 'cvr-d');
  }

}

const coverService = new CoverService();

export default coverService;
