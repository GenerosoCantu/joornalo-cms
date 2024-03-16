import apiService from 'src/services/apiService';
import { tenantUrls } from 'src/constants'

class UploadService {

  uploadImage = (tenant, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = { "Content-Type": "multipart/form-data" }
    return apiService.makeRequest('post', tenantUrls.cdnapi, `files/upload/${tenant}`, 'upl-u', formData, headers);
  }

  deleteImage = (tenant, file) => {
    return apiService.makeRequest('delete', tenantUrls.cdnapi, `files/${tenant}/${file}`, 'file-d');
    // return apiService.makeRequest('delete', tenantUrls.cdnapi, `files/tmp/${file}`, 'file-d');
  }

}

const uploadService = new UploadService();

export default uploadService;
