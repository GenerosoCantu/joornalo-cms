import apiService from 'src/services/apiService';

class UploadService {

  uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = { "Content-Type": "multipart/form-data" }
    return apiService.makeRequest('post', `http://localhost:4000/files/upload/`, 'upl-u', formData, headers);
  }

  deleteImage = (file) => {
    console.log('deleteImage:', file)
    return apiService.makeRequest('delete', `http://localhost:4000/files/${file}`, 'usr-d');
  }

}

const uploadService = new UploadService();

export default uploadService;
