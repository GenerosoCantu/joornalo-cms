import apiService from 'src/services/apiService';
import { tenantUrls } from 'src/constants'

class UploadService {

  uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = { "Content-Type": "multipart/form-data" }
    return apiService.makeRequest('post', tenantUrls.cdnapi, `files/upload/`, 'upl-u', formData, headers);
  }

  deleteImage = (file) => {
    console.log('deleteImage:', file)
    return apiService.makeRequest('delete', tenantUrls.cdnapi, `files/tmp/${file}`, 'file-d');
  }

}

const uploadService = new UploadService();

export default uploadService;
