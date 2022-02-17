import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class NewsService {

  getNew = (newsid) => {
    return apiService.makeRequest('get', `http://localhost:4000/news/${newsid}`, 'sct-g');
  }

  getNews = (newsQuery) => {
    const { page, limit, section, status, sort, date } = newsQuery
    const [sortBy, sortOrder] = sort.split('|')
    const params =
      `?page=${page}&limit=${limit}` +
      (section !== 'All' ? `&section=${section}` : "") +
      (status !== 'All' ? `&status=${status}` : "") +
      `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
      (date ? `&date=${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : "")

    return apiService.makeRequest('get', `http://localhost:4000/news/${params}`, 'sct-gs');
  }

  updateNew = (news) => {
    return apiService.makeRequest('patch', `http://localhost:4000/news/${news.id}`, 'sct-u', news);
  }

  createNew = (news) => {
    const newNew = { ...news, _id: uuidv4() };
    return apiService.makeRequest('post', `http://localhost:4000/news/`, 'sct-c', newNew);
  }

  deleteNew = (newsid) => {
    return apiService.makeRequest('delete', `http://localhost:4000/news/${newsid}`, 'sct-d');
  }

}

const newsService = new NewsService();

export default newsService;
