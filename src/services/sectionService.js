import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';
import { tenantUrls } from 'src/constants'

class SectionService {

  getSection = (sectionid) => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `sections/${sectionid}`, 'sct-g');
  }

  getSections = () => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `sections/`, 'sct-gs');
  }

  updateSection = (section) => {
    return apiService.makeRequest('patch', tenantUrls.cmsapi, `sections/${section.id}`, 'sct-u', section);
  }

  createSection = (section) => {
    const newSection = { ...section, _id: uuidv4() };
    return apiService.makeRequest('post', tenantUrls.cmsapi, `sections/`, 'sct-c', newSection);
  }

  deleteSection = (sectionid) => {
    return apiService.makeRequest('delete', tenantUrls.cmsapi, `sections/${sectionid}`, 'sct-d');
  }

}

const sectionService = new SectionService();

export default sectionService;
