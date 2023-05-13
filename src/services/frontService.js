import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class FrontService {

  getFront = (frontid) => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}fronts/${frontid}`, 'sct-g');
  }

  getFronts = (frontQuery) => {
    const { page, limit, section, status, sort, date } = frontQuery
    const [sortBy, sortOrder] = sort.split('|')
    const params =
      `?page=${page}&limit=${limit}` +
      (section !== 'All' ? `&section=${section}` : "") +
      (status !== 'All' ? `&status=${status}` : "") +
      `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
      (date ? `&date=${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : "")

    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}fronts/${params}`, 'sct-gs');
  }

  updateFront = (front) => {
    return apiService.makeRequest('patch', `${process.env.REACT_APP_JOORNALO_API_URL}fronts/${front._id}`, 'sct-u', front);
  }

  createFront = (front) => {
    const newFront = { ...front, _id: uuidv4() };
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_API_URL}fronts/`, 'sct-c', newFront);
  }

  deleteFront = (frontId) => {
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_API_URL}fronts/${frontId}`, 'sct-d');
  }

}

const frontService = new FrontService();

export default frontService;
