import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class SectionService {

  getSection = (sectionid) => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}sections/${sectionid}`, 'sct-g');
  }

  getSections = () => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}sections/`, 'sct-gs');
  }

  updateSection = (section) => {
    return apiService.makeRequest('patch', `${process.env.REACT_APP_JOORNALO_API_URL}sections/${section.id}`, 'sct-u', section);
  }

  createSection = (section) => {
    const newSection = { ...section, _id: uuidv4() };
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_API_URL}sections/`, 'sct-c', newSection);
  }

  deleteSection = (sectionid) => {
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_API_URL}sections/${sectionid}`, 'sct-d');
  }

}

const sectionService = new SectionService();

export default sectionService;
