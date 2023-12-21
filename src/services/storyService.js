import apiService from 'src/services/apiService';
import { v4 as uuidv4 } from 'uuid';
import { tenantUrls } from 'src/constants'

class StoryService {

  getStory = (storyid) => {
    return apiService.makeRequest('get', tenantUrls.cmsapi, `stories/${storyid}`, 'sct-g');
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

    return apiService.makeRequest('get', tenantUrls.cmsapi, `stories/${params}`, 'stry-gs');
  }

  updateStory = (story) => {
    return apiService.makeRequest('patch', tenantUrls.cmsapi, `stories/${story._id}`, 'stry-u', story);
  }

  createStory = (story) => {
    const newStory = { ...story, _id: uuidv4() };
    return apiService.makeRequest('post', tenantUrls.cmsapi, `stories/`, 'stry-c', newStory);
  }

  deleteStory = (storyId) => {
    return apiService.makeRequest('delete', tenantUrls.cmsapi, `stories/${storyId}`, 'stry-d');
  }

}

const storyService = new StoryService();

export default storyService;
