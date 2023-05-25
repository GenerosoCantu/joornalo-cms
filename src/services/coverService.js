import apiService from 'src/services/apiService';
import { tenantUrls } from 'src/constants'

class CoverService {

  getCover = (coverid) => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `covers/${coverid}`, 'sct-g');
  }

  getCovers = () => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `covers/`, 'sct-gs');
  }

  updateCover = (cover) => {
    return apiService.makeRequest('patch', tenantUrls.cmsapi, `covers/${cover.id}`, 'sct-u', cover);
  }

  createCover = (cover) => {
    return apiService.makeRequest('post', tenantUrls.cmsapi, `covers/`, 'sct-c', cover);
  }

  deleteCover = (coverid) => {
    return apiService.makeRequest('delete', tenantUrls.cmsapi, `covers/${coverid}`, 'sct-d');
  }

}

const coverService = new CoverService();

export default coverService;
