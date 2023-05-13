import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';

class StoryService {

  getStory = (storyid) => {
    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}stories/${storyid}`, 'sct-g');
  }

  getStories = (storyQuery) => {
    const { page, limit, section, status, sort, date } = storyQuery
    const [sortBy, sortOrder] = sort.split('|')
    const params =
      `?page=${page}&limit=${limit}` +
      (section !== 'All' ? `&section=${section}` : "") +
      (status !== 'All' ? `&status=${status}` : "") +
      `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
      (date ? `&date=${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : "")

    return apiService.makeRequest('get', `${process.env.REACT_APP_JOORNALO_API_URL}stories/${params}`, 'sct-gs');
  }

  updateStory = (story) => {
    return apiService.makeRequest('patch', `${process.env.REACT_APP_JOORNALO_API_URL}stories/${story._id}`, 'sct-u', story);
  }

  createStory = (story) => {
    const newStory = { ...story, _id: uuidv4() };
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_API_URL}stories/`, 'sct-c', newStory);
  }

  deleteStory = (storyId) => {
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_API_URL}stories/${storyId}`, 'sct-d');
  }

}

const storyService = new StoryService();

export default storyService;
