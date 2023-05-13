import apiService from 'src/services/apiService';

class UploadService {

  uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = { "Content-Type": "multipart/form-data" }
    return apiService.makeRequest('post', `${process.env.REACT_APP_JOORNALO_CDN_API_URL}files/upload/`, 'upl-u', formData, headers);
  }

  deleteImage = (file) => {
    console.log('deleteImage:', file)
    return apiService.makeRequest('delete', `${process.env.REACT_APP_JOORNALO_CDN_API_URL}files/${file}`, 'usr-d');
  }

}

const uploadService = new UploadService();

export default uploadService;
