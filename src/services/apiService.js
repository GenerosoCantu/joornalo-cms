import axios from 'src/utils/axios';

class ApiService {

  makeRequest = (method, url, errorCode, data) => new Promise((resolve, reject) => {

    // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
    const config = {
      method,
      url,
      data
    }

    // Convert to async await and get rid of .then

    axios(config)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(`${errorCode}-01`);
        }
      })
      .catch(err => {
        if (err.response) {
          reject(`${errorCode}-02`);
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          reject(`${errorCode}-03`);
          // client never received a response, or request never left
        } else {
          reject(`${errorCode}-04`);
          // anything else
        }
      })
  })

}

const apiService = new ApiService();

export default apiService;
