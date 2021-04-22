import apiService from 'src/services/apiService';

class CoverService {

  getCover = (coverid) => {
    return apiService.makeRequest('get', `http://localhost:4000/covers/${coverid}`, 'sct-g');
  }

  getCovers = () => {
    return apiService.makeRequest('get', `http://localhost:4000/covers/`, 'sct-gs');
  }

  updateCover = (cover) => {
    return apiService.makeRequest('patch', `http://localhost:4000/covers/${cover.id}`, 'sct-u', cover);
  }

  createCover = (cover) => {
    return apiService.makeRequest('post', `http://localhost:4000/covers/`, 'sct-c', cover);
  }

  deleteCover = (coverid) => {
    return apiService.makeRequest('delete', `http://localhost:4000/covers/${coverid}`, 'sct-d');
  }

}

const coverService = new CoverService();

export default coverService;
