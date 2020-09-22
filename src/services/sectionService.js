import apiService from 'src/services/apiService';

class SectionService {

  getSection = (sectionid) => {
    return apiService.makeRequest('get', `http://localhost:4000/sections/${sectionid}`, 'sct-g');
  }

  getSections = () => {
    return apiService.makeRequest('get', `http://localhost:4000/sections/`, 'sct-gs');
  }

  updateSection = (section) => {
    return apiService.makeRequest('patch', `http://localhost:4000/sections/${section._id}`, 'sct-u', section);
  }

  createSection = (section) => {
    return apiService.makeRequest('post', `http://localhost:4000/sections/`, 'sct-c', section);
  }

  deleteSection = (sectionid) => {
    return apiService.makeRequest('delete', `http://localhost:4000/sections/${sectionid}`, 'sct-d');
  }

}

const sectionService = new SectionService();

export default sectionService;
