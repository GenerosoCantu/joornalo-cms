import apiService from 'src/services/apiService';

class CoverService {

  getCover = (coverid) => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}covers/${coverid}`, 'sct-g');
  }

  getCovers = () => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}covers/`, 'sct-gs');
  }

  updateCover = (cover) => {
    return apiService.makeRequest('patch', `${process.env.REACT_APP_JOORNALO_API_URL}covers/${cover.id}`, 'sct-u', cover);
  }

  createCover = (cover) => {
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_API_URL}covers/`, 'sct-c', cover);
  }

  deleteCover = (coverid) => {
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_API_URL}covers/${coverid}`, 'sct-d');
  }

}

const coverService = new CoverService();

export default coverService;
