import axios from 'src/utils/axios';

class ApiService {

  makeRequest = (method, base, url, errorCode, data, headers) => {
    try {

      return new Promise((resolve, reject) => {

        const tenantUrls = JSON.parse(sessionStorage.getItem("tenantUrls"));
        if (tenantUrls || !base) {
          const fullUrl = base ? `${tenantUrls[base]}${url}` : url;

          // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
          const config = {
            method,
            url: fullUrl,
            data,
            headers
          }

          // Convert to async await and get rid of .then

          axios(config)
            .then((response) => {
              if (response.data || response.status === 200) {
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

        } else {
          return;
          // reject(`${errorCode}-99`);
        }
      })

    } catch (error) {
      // dispatch(setError(error));
      // throw error;
      return;
    }
  }

}

// class ApiService {

//   makeRequest = (method, base, url, errorCode, data, headers) => new Promise((resolve, reject) => {

//     const tenantUrls = JSON.parse(sessionStorage.getItem("tenantUrls"));
//     console.log('tenantUrls=====>', tenantUrls);
//     if (tenantUrls || !base) {
//       const fullUrl = base ? `${tenantUrls[base]}${url}` : url;

//       // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
//       const config = {
//         method,
//         url: fullUrl,
//         data,
//         headers
//       }

//       // Convert to async await and get rid of .then

//       axios(config)
//         .then((response) => {
//           if (response.data || response.status === 200) {
//             resolve(response.data);
//           } else {
//             reject(`${errorCode}-01`);
//           }
//         })
//         .catch(err => {
//           if (err.response) {
//             reject(`${errorCode}-02`);
//             // client received an error response (5xx, 4xx)
//           } else if (err.request) {
//             reject(`${errorCode}-03`);
//             // client never received a response, or request never left
//           } else {
//             reject(`${errorCode}-04`);
//             // anything else
//           }
//         })

//     } else {
//       reject(`${errorCode}-99`);
//     }
//   })

// }

const apiService = new ApiService();

export default apiService;
